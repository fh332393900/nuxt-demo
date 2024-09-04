import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NUXT_SUPABASE_URL
const supabaseKey = process.env.NUXT_SUPABASE_KEY

const supabase = createClient(supabaseUrl as string, supabaseKey as string)

export default supabase
