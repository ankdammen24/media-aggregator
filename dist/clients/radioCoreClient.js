import { env } from '../config/env.js';
export async function checkRadioCoreConnectivity() {
    const res = await fetch(`${env.RADIO_CORE_API_URL}/health`).catch(() => null);
    return !!res?.ok;
}
//# sourceMappingURL=radioCoreClient.js.map