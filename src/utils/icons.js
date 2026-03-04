// src/utils/icons.js — Lucide SVG іконки (inline, без width/height — розмір керується CSS)

const SVG_ATTRS = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"`;

export const ICONS = {

    arrowLeft: `<svg ${SVG_ATTRS}>
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
    </svg>`,

    user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 12h.01"/>
        <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/>
        <path d="M2 20h20"/>
    </svg>`,

    maximize: `<svg ${SVG_ATTRS}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>`,

    minimize: `<svg ${SVG_ATTRS}>
        <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
        <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
        <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
        <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
    </svg>`,

};
