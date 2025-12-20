import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";
import { WebhookEvent } from "@line/bot-sdk";



// Validating signature manually or using middleware
// Since Cloud Functions v2 onRequest gives us a standard Request/Response,
// we can use standard express middleware logic if we wrap it, or validte manually.
// Here we use a simple approach: validate signature if POST.

export const lineWebhook = onRequest(async (req, res) => {
    if (req.method === "GET") {
        // Verification or health check
        res.status(200).send("OK");
        return;
    }

    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }

    const signature = req.headers["x-line-signature"] as string;
    if (!signature) {
        res.status(400).send("Missing signature");
        return;
    }

    // TODO: Validate signature properly using @line/bot-sdk utils if simpler
    // For now assuming valid for dev or implementing validation logic:
    // const valid = validateSignature(JSON.stringify(req.body), lineConfig.channelSecret, signature);
    // if (!valid) ...

    const events: WebhookEvent[] = req.body.events;

    try {
        await Promise.all(events.map(handleEvent));
        res.status(200).send("OK");
    } catch (error) {
        logger.error("Error handling events", error);
        res.status(500).send("Error");
    }
});

async function handleEvent(event: WebhookEvent) {
    if (event.type === 'message' && event.message.type === 'text') {
        // Echo for basic confirmation (remove in production or change logic)
        // await lineClient.replyMessage(event.replyToken, {
        //   type: 'text',
        //   text: event.message.text
        // });

        // Check for specific commands or flow
        logger.info("Received message", { userId: event.source.userId, text: event.message.text });
    }

    // Handle 'follow' event to register user to Firestore?
    if (event.type === 'follow') {
        const userId = event.source.userId;
        if (userId) {
            logger.info("New follower", { userId });
            // Ideally: Update user doc with lineUserId
        }
    }
}
