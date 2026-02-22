import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jwofxvcrdoznctopmuyv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uZ3QoBywR_HhKEr3lEPsuQ_tJPoXgDS';

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);