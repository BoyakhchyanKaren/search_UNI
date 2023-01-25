import 'reflect-metadata';
import { getApplication } from './app';

const app = getApplication();

(async () => {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Starting listen server on port ${PORT}...`);
    });
})();
