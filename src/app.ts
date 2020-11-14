import express from 'express';
import * as bodyParser from 'body-parser';
import { query } from "./twitch"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res): void => {
    res.render('pages/index');
});

app.get('/twitch/analytics', async (req, res): Promise<void> => {
    try {
        const username = req.query.username;
        if (!username) throw new Error("Missing username.")
        const user = await query(`/users?login=${username}`)
        if (user.data.length === 0) throw new Error("User not found.")
        const { id } = user.data[0];
        const videos = await query(`/videos?user_id=${id}&first=10`)
        const streams = await query(`/streams?user_id=${id}&first=10`)
        res.render('pages/profile', { user, videos, streams });
    } catch (error) {
        res.render('pages/error', { message: error.message });
    }
});

export { app };