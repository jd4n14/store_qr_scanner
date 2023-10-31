import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import * as path from 'node:path';
import fastifyHttpErrorsEnhanced from 'fastify-http-errors-enhanced';
const app = Fastify({
    logger: true
});
app.register(autoload, {
    dir: path.join(__dirname, 'plugins')
});
const start = async () => {
    try {
        await app.register(fastifyHttpErrorsEnhanced);
        await app.listen({ port: 3000 });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
