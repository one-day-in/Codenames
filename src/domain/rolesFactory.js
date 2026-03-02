// src/domain/rolesFactory.js
import { shuffle } from '../utils/random.js';

export function createRoleDistribution(size) {
    const total = size * size;

    const startsFirst = Math.random() < 0.5 ? 'resonant' : 'dissonant';

    const firstCount  = Math.ceil(total / 3);  // 9
    const secondCount = firstCount - 1;        // 8

    const resonantCount  = startsFirst === 'resonant'  ? firstCount : secondCount;
    const dissonantCount = startsFirst === 'dissonant' ? firstCount : secondCount;
    const nightmareCount = 1;
    const anomalyCount   = total - resonantCount - dissonantCount - nightmareCount;

    const roles = [
        ...Array(resonantCount).fill('resonant'),
        ...Array(dissonantCount).fill('dissonant'),
        ...Array(anomalyCount).fill('anomaly'),
        ...Array(nightmareCount).fill('nightmare'),
    ];

    return { roles: shuffle(roles), startsFirst };
}