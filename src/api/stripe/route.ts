import prisma from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature')!;

	// Verify webhook came from Stripe
	let event;
	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (err) {
		console.log('Webhook verification failed', err);
		return Response.json(null, { status: 400 });
	}

	// Fulfill order
	switch (event.type) {
		case 'checkout.session.completed':
			await prisma?.user.update({
				where: { email: event.data.object.customer_email! },
				data: {
					hasAccess: true,
				},
			});
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return 200 OK
	return Response.json(null, { status: 200 });
}
