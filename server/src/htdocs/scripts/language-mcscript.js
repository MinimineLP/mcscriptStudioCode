let number = /([1-9]+)/;

CodeMirror.defineSimpleMode("mcscript", {
  start: [
    {regex: /black|§0|\\u00A70/gmi, token: "style-black"},
    {regex: /dark_blue|§1|\\u00A71/gmi, token: "style-dark_blue"},
    {regex: /dark_green|§2|\\u00A72/gmi, token: "style-dark_green"},
    {regex: /dark_aqua|§3|\\u00A73/gmi, token: "style-dark_aqua"},
    {regex: /dark_red|§4|\\u00A74/gmi, token: "style-dark_red"},
    {regex: /dark_purple|§d|\\u00A7d/gmi, token: "style-dark_purple"},
    {regex: /gold|§6|\\u00A76/gmi, token: "style-gold"},
    {regex: /gray|§7|\\u00A77/gmi, token: "style-gray"},
    {regex: /dark_gray|§8|\\u00A78/gmi, token: "style-dark_gray"},
    {regex: /blue|§9|\\u00A79/gmi, token: "style-blue"},
    {regex: /green|§a|\\u00A7a/gmi, token: "style-green"},
    {regex: /aqua|§b|\\u00A7b/gmi, token: "style-aqua"},
    {regex: /red|§c|\\u00A7c/gmi, token: "style-red"},
    {regex: /light_purple|§d|\\u00A7d/gmi, token: "style-light_purple"},
    {regex: /yellow|§e|\\u00A7e/gmi, token: "style-yellow"},
    {regex: /white|§f|\\u00A7f/gmi, token: "style-white"},
    {regex: /reset|§r|\\u00A7r/gmi, token: "style-reset"},
    {regex: /bold|§l|\\u00A7l/gmi, token: "style-bold"},
    {regex: /underline|§n|\\u00A7n/gmi, token: "style-underline"},
    {regex: /italic|§o|\\u00A7o/gmi, token: "style-italic"},
    {regex: /strikethrough|§m|\\u00A7m/gmi, token: "style-strikethrough"},
    {regex: /obfuscated|§k|\\u00A7k/gmi, token: "style-obfuscated"},
    {regex: /(modal)(\s+)([\w\d$\/\._-]*)/,token: ["keyword", null, "variable-2"]},
    {regex: /(?:if|then|else|true|false|as|at|asat|positioned|align|dimension|rotated|anchored|while|do|forEach|for|raycast|stop|continue|switch|case|default|var|bool|boolean|tag|score|const)/,token: "keyword"},
    {regex: /(\s*)(execute)(\s+)(align|as|at|if|offset|run|store|unless)/,token: [null, "keyword", null, "variable-3"]},
    {regex: /(\$[\w\-]*)/,token: ["variable"]},
    {regex: /(\s*#file:|\s*#extend:)(\s+)([\w\d$\/\._-]*)/,token: ["keyword", null, "variable-2"],sol: true},
    {regex: /@[apers](\[[a-zA-Z0-9_=,!${}]*?\]+)?/,token: ["variable-3"]},
    {regex: /\s*#.*/,token: ["comment"],sol: true},
    {regex: /\s*\/\/.*/,token: ["comment"],sol: true},
    {regex: /\/\*\*/, token: "comment2", next: "comment2"},
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /\b[0-9\.\-]+\b/,token: ["number"]},
    {regex: /(?:minecraft:[a-zA-Z0-9]*|area_effect_cloud|armor_stand|arrow|bat|blaze|boat|cave_spider|chest_minecart|chicken|commandblock_minecart|cow|creeper|donkey|dragon_fireball|egg|elder_guardian|ender_crystal|ender_dragon|ender_pearl|enderman|endermite|evocation_fangs|evocation_illager|eye_of_ender_signal|falling_block|fireball|fireworks_rocket|furnace_minecart|ghast|giant|guardian|hopper_minecart|horse|husk|illusion_illager|item|item_frame|leash_knot|lightning_bolt|llama|llama_spit|magma_cube|minecart|mooshroom|mule|ocelot|painting|parrot|pig|polar_bear|potion|rabbit|sheep|shulker|shulker_bullet|silverfish|skeleton|skeleton_horse|slime|small_fireball|snowball|snowman|spawner_minecart|spectral_arrow|spider|squid|stray|tnt|tnt_minecart|vex|villager|villager_golem|vindication_illager|witch|wither|wither_skeleton|wither_skull|wolf|xp_bottle|xp_orb|zombie|zombie_horse|zombie_pigman|zombie_villager|minecraft:|acacia_bark|acacia_boat|acacia_button|acacia_door|acacia_fence|acacia_fence_gate|acacia_leaves|acacia_log|acacia_planks|acacia_pressure_plate|acacia_sapling|acacia_slab|acacia_stairs|acacia_trapdoor|activator_rail|air|allium|andesite|anvil|apple|armor_stand|arrow|azure_bluet|baked_potato|barrier|bat_spawn_egg|beacon|bedrock|beef|beetroot|beetroot_seeds|beetroot_soup|birch_bark|birch_boat|birch_button|birch_door|birch_fence|birch_fence_gate|birch_leaves|birch_log|birch_planks|birch_pressure_plate|birch_sapling|birch_slab|birch_stairs|birch_trapdoor|black_banner|black_bed|black_carpet|black_concrete|black_concrete_powder|black_glazed_terracotta|black_shulker_box|black_stained_glass|black_stained_glass_pane|black_terracotta|black_wool|blaze_powder|blaze_rod|blaze_spawn_egg|blue_banner|blue_bed|blue_carpet|blue_concrete|blue_concrete_powder|blue_glazed_terracotta|blue_orchid|blue_shulker_box|blue_stained_glass|blue_stained_glass_pane|blue_terracotta|blue_wool|bone|bone_block|bone_meal|book|bookshelf|bow|bowl|bread|brewing_stand|brick|brick_slab|brick_stairs|bricks|brown_banner|brown_bed|brown_carpet|brown_concrete|brown_concrete_powder|brown_glazed_terracotta|brown_mushroom|brown_mushroom_block|brown_shulker_box|brown_stained_glass|brown_stained_glass_pane|brown_terracotta|brown_wool|bucket|cactus|cactus_green|cake|carrot|carrot_on_a_stick|carved_pumpkin|cauldron|cave_spider_spawn_egg|chain_command_block|chainmail_boots|chainmail_chestplate|chainmail_helmet|chainmail_leggings|charcoal|chest|chest_minecart|chicken|chicken_spawn_egg|chipped_anvil|chiseled_quartz_block|chiseled_red_sandstone|chiseled_sandstone|chiseled_stone_bricks|chorus_flower|chorus_fruit|chorus_fruit_popped|chorus_plant|clay|clay_ball|clock|clownfish|coal|coal_block|coal_ore|coarse_dirt|cobblestone|cobblestone_slab|cobblestone_stairs|cobblestone_wall|cobweb|cocoa_beans|cod|command_block|command_block_minecart|comparator|compass|cooked_beef|cooked_chicken|cooked_cod|cooked_mutton|cooked_porkchop|cooked_rabbit|cooked_salmon|cookie|cow_spawn_egg|cracked_stone_bricks|crafting_table|creeper_head|creeper_spawn_egg|cut_red_sandstone|cut_sandstone|cyan_banner|cyan_bed|cyan_carpet|cyan_concrete|cyan_concrete_powder|cyan_dye|cyan_glazed_terracotta|cyan_shulker_box|cyan_stained_glass|cyan_stained_glass_pane|cyan_terracotta|cyan_wool|damaged_anvil|dandelion|dandelion_yellow|dark_oak_bark|dark_oak_boat|dark_oak_button|dark_oak_door|dark_oak_fence|dark_oak_fence_gate|dark_oak_leaves|dark_oak_log|dark_oak_planks|dark_oak_pressure_plate|dark_oak_sapling|dark_oak_slab|dark_oak_stairs|dark_oak_trapdoor|dark_prismarine|daylight_detector|dead_bush|debug_stick|detector_rail|diamond|diamond_axe|diamond_block|diamond_boots|diamond_chestplate|diamond_helmet|diamond_hoe|diamond_horse_armor|diamond_leggings|diamond_ore|diamond_pickaxe|diamond_shovel|diamond_sword|diorite|dirt|dispenser|donkey_spawn_egg|dragon_breath|dragon_egg|dragon_head|dropper|egg|elder_guardian_spawn_egg|elytra|emerald|emerald_block|emerald_ore|enchanted_book|enchanted_golden_apple|enchanting_table|end_crystal|end_portal_frame|end_rod|end_stone|end_stone_bricks|ender_chest|ender_eye|ender_pearl|enderman_spawn_egg|endermite_spawn_egg|evocation_illager_spawn_egg|experience_bottle|farmland|feather|fermented_spider_eye|fern|filled_map|fire_charge|firework_rocket|firework_star|fishing_rod|flint|flint_and_steel|flower_pot|furnace|furnace_minecart|ghast_spawn_egg|ghast_tear|glass|glass_bottle|glass_pane|glowstone|glowstone_dust|gold_block|gold_ingot|gold_nugget|gold_ore|golden_apple|golden_axe|golden_boots|golden_carrot|golden_chestplate|golden_helmet|golden_hoe|golden_horse_armor|golden_leggings|golden_pickaxe|golden_shovel|golden_sword|granite|grass|grass_block|grass_path|gravel|gray_banner|gray_bed|gray_carpet|gray_concrete|gray_concrete_powder|gray_dye|gray_glazed_terracotta|gray_shulker_box|gray_stained_glass|gray_stained_glass_pane|gray_terracotta|gray_wool|green_banner|green_bed|green_carpet|green_concrete|green_concrete_powder|green_glazed_terracotta|green_shulker_box|green_stained_glass|green_stained_glass_pane|green_terracotta|green_wool|guardian_spawn_egg|gunpowder|hay_block|heavy_weighted_pressure_plate|hopper|hopper_minecart|horse_spawn_egg|husk_spawn_egg|ice|infested_chiseled_stone_bricks|infested_cobblestone|infested_cracked_stone_bricks|infested_mossy_stone_bricks|infested_stone|infested_stone_bricks|ink_sac|iron_axe|iron_bars|iron_block|iron_boots|iron_chestplate|iron_door|iron_helmet|iron_hoe|iron_horse_armor|iron_ingot|iron_leggings|iron_nugget|iron_ore|iron_pickaxe|iron_shovel|iron_sword|iron_trapdoor|item_frame|jack_o_lantern|jukebox|jungle_bark|jungle_boat|jungle_button|jungle_door|jungle_fence|jungle_fence_gate|jungle_leaves|jungle_log|jungle_planks|jungle_pressure_plate|jungle_sapling|jungle_slab|jungle_stairs|jungle_trapdoor|knowledge_book|ladder|lapis_block|lapis_lazuli|lapis_ore|large_fern|lava_bucket|lead|leather|leather_boots|leather_chestplate|leather_helmet|leather_leggings|lever|light_blue_banner|light_blue_bed|light_blue_carpet|light_blue_concrete|light_blue_concrete_powder|light_blue_dye|light_blue_glazed_terracotta|light_blue_shulker_box|light_blue_stained_glass|light_blue_stained_glass_pane|light_blue_terracotta|light_blue_wool|light_gray_banner|light_gray_bed|light_gray_carpet|light_gray_concrete|light_gray_concrete_powder|light_gray_dye|light_gray_glazed_terracotta|light_gray_shulker_box|light_gray_stained_glass|light_gray_stained_glass_pane|light_gray_terracotta|light_gray_wool|light_weighted_pressure_plate|lilac|lily_pad|lime_banner|lime_bed|lime_carpet|lime_concrete|lime_concrete_powder|lime_dye|lime_glazed_terracotta|lime_shulker_box|lime_stained_glass|lime_stained_glass_pane|lime_terracotta|lime_wool|lingering_potion|llama_spawn_egg|magenta_banner|magenta_bed|magenta_carpet|magenta_concrete|magenta_concrete_powder|magenta_dye|magenta_glazed_terracotta|magenta_shulker_box|magenta_stained_glass|magenta_stained_glass_pane|magenta_terracotta|magenta_wool|magma_block|magma_cream|magma_cube_spawn_egg|map|melon|melon_block|melon_seeds|milk_bucket|minecart|mob_spawner|mooshroom_spawn_egg|mossy_cobblestone|mossy_cobblestone_wall|mossy_stone_bricks|mule_spawn_egg|mushroom_stem|mushroom_stew|music_disc_11|music_disc_13|music_disc_blocks|music_disc_cat|music_disc_chirp|music_disc_far|music_disc_mall|music_disc_mellohi|music_disc_stal|music_disc_strad|music_disc_wait|music_disc_ward|mutton|mycelium|name_tag|nether_brick|nether_brick_fence|nether_brick_slab|nether_brick_stairs|nether_bricks|nether_quartz_ore|nether_star|nether_wart|nether_wart_block|netherrack|note_block|oak_bark|oak_boat|oak_button|oak_door|oak_fence|oak_fence_gate|oak_leaves|oak_log|oak_planks|oak_pressure_plate|oak_sapling|oak_slab|oak_stairs|oak_trapdoor|observer|obsidian|ocelot_spawn_egg|orange_banner|orange_bed|orange_carpet|orange_concrete|orange_concrete_powder|orange_dye|orange_glazed_terracotta|orange_shulker_box|orange_stained_glass|orange_stained_glass_pane|orange_terracotta|orange_tulip|orange_wool|oxeye_daisy|packed_ice|painting|paper|parrot_spawn_egg|peony|petrified_oak_slab|pig_spawn_egg|pink_banner|pink_bed|pink_carpet|pink_concrete|pink_concrete_powder|pink_dye|pink_glazed_terracotta|pink_shulker_box|pink_stained_glass|pink_stained_glass_pane|pink_terracotta|pink_tulip|pink_wool|piston|player_head|podzol|poisonous_potato|polar_bear_spawn_egg|polished_andesite|polished_diorite|polished_granite|poppy|porkchop|potato|potion|powered_rail|prismarine|prismarine_bricks|prismarine_crystals|prismarine_shard|pufferfish|pumpkin|pumpkin_pie|pumpkin_seeds|purple_banner|purple_bed|purple_carpet|purple_concrete|purple_concrete_powder|purple_dye|purple_glazed_terracotta|purple_shulker_box|purple_stained_glass|purple_stained_glass_pane|purple_terracotta|purple_wool|purpur_block|purpur_pillar|purpur_slab|purpur_stairs|quartz|quartz_block|quartz_pillar|quartz_slab|quartz_stairs|rabbit|rabbit_foot|rabbit_hide|rabbit_spawn_egg|rabbit_stew|rail|red_banner|red_bed|red_carpet|red_concrete|red_concrete_powder|red_glazed_terracotta|red_mushroom|red_mushroom_block|red_nether_bricks|red_sand|red_sandstone|red_sandstone_slab|red_sandstone_stairs|red_shulker_box|red_stained_glass|red_stained_glass_pane|red_terracotta|red_tulip|red_wool|redstone|redstone_block|redstone_lamp|redstone_ore|redstone_torch|repeater|repeating_command_block|rose_bush|rose_red|rotten_flesh|saddle|salmon|sand|sandstone|sandstone_slab|sandstone_stairs|sea_lantern|shears|sheep_spawn_egg|shield|shulker_shell|shulker_spawn_egg|sign|silverfish_spawn_egg|skeleton_horse_spawn_egg|skeleton_skull|skeleton_spawn_egg|slime_ball|slime_block|slime_spawn_egg|smooth_quartz|smooth_red_sandstone|smooth_sandstone|smooth_stone|snow|snow_block|snowball|soul_sand|speckled_melon|spectral_arrow|spider_eye|spider_spawn_egg|splash_potion|sponge|spruce_bark|spruce_boat|spruce_button|spruce_door|spruce_fence|spruce_fence_gate|spruce_leaves|spruce_log|spruce_planks|spruce_pressure_plate|spruce_sapling|spruce_slab|spruce_stairs|spruce_trapdoor|squid_spawn_egg|stick|sticky_piston|stone|stone_axe|stone_brick_slab|stone_brick_stairs|stone_bricks|stone_button|stone_hoe|stone_pickaxe|stone_pressure_plate|stone_shovel|stone_slab|stone_sword|stray_spawn_egg|string|structure_block|structure_void|sugar|sugar_cane|sunflower|tall_grass|terracotta|tipped_arrow|tnt|tnt_minecart|torch|totem_of_undying|trapped_chest|tripwire_hook|vex_spawn_egg|villager_spawn_egg|vindication_illager_spawn_egg|vine|water_bucket|wet_sponge|wheat|wheat_seeds|white_banner|white_bed|white_carpet|white_concrete|white_concrete_powder|white_glazed_terracotta|white_shulker_box|white_stained_glass|white_stained_glass_pane|white_terracotta|white_tulip|white_wool|witch_spawn_egg|wither_skeleton_skull|wither_skeleton_spawn_egg|wolf_spawn_egg|wooden_axe|wooden_hoe|wooden_pickaxe|wooden_shovel|wooden_sword|writable_book|written_book|yellow_banner|yellow_bed|yellow_carpet|yellow_concrete|yellow_concrete_powder|yellow_glazed_terracotta|yellow_shulker_box|yellow_stained_glass|yellow_stained_glass_pane|yellow_terracotta|yellow_wool|zombie_head|zombie_horse_spawn_egg|zombie_pigman_spawn_egg|zombie_spawn_egg|zombie_villager_spawn_egg|day|night|noon|midnight|aqua_affinity|bane_of_arthropods|binding_curse|blast_protection|depth_strider|efficiency|feather_falling|fire_aspect|fire_protection|flame|fortune|frost_walker|infinity|knockback|looting|luck_of_the_sea|lure|mending|power|projectile_protection|protection|punch|respiration|sharpness|silk_touch|smite|sweeping|thorns|unbreaking|vanishing_curse|absorption|blindness|fire_resistance|glowing|haste|health_boost|hunger|instant_damage|instant_health|invisibility|jump_boost|levitation|luck|mining_fatigue|nausea|night_vision|poison|regeneration|resistance|saturation|saturation|speed|strength|unluck|water_breathing|weakness|wither|ambient_entity_effect|angry_villager|barrier|block|bubble|cloud|crit|damage_indicator|dragon_breath|dripping_lava|dripping_water|dust|effect|elder_guardian|enchant|enchanted_hit|end_rod|entity_effect|explosion|explosion_emitter|falling_dust|firework|fishing|flame|happy_villager|heart|instant_effect|item|item_slime|item_snowball|large_smoke|lava|mycelium|note|poof|portal|rain|smoke|spit|splash|sweep_attack|totem_of_undying|underwater|witch|air|armor|deathCount|dummy|food|health|killedByTeam.aqua|killedByTeam.black|killedByTeam.blue|killedByTeam.dark_aqua|killedByTeam.dark_blue|killedByTeam.dark_gray|killedByTeam.dark_green|killedByTeam.dark_purple|killedByTeam.dark_red|killedByTeam.gold|killedByTeam.gray|killedByTeam.green|killedByTeam.light_purple|killedByTeam.red|killedByTeam.white|killedByTeam.yellow|level|minecraft.broken:|minecraft.crafted:|minecraft.custom:minecraft.animals_bred|minecraft.custom:minecraft.aviate_one_cm|minecraft.custom:minecraft.boat_one_cm|minecraft.custom:minecraft.clean_armor|minecraft.custom:minecraft.clean_banner|minecraft.custom:minecraft.climb_one_cm|minecraft.custom:minecraft.crouch_one_cm|minecraft.custom:minecraft.damage_dealt|minecraft.custom:minecraft.damage_taken|minecraft.custom:minecraft.deaths|minecraft.custom:minecraft.dive_one_cm|minecraft.custom:minecraft.drop|minecraft.custom:minecraft.eat_cake_slice|minecraft.custom:minecraft.enchant_item|minecraft.custom:minecraft.fall_one_cm|minecraft.custom:minecraft.fill_cauldron|minecraft.custom:minecraft.fish_caught|minecraft.custom:minecraft.fly_one_cm|minecraft.custom:minecraft.horse_one_cm|minecraft.custom:minecraft.inspect_dispenser|minecraft.custom:minecraft.inspect_dropper|minecraft.custom:minecraft.inspect_hopper|minecraft.custom:minecraft.interact_with_beacon|minecraft.custom:minecraft.interact_with_brewingstand|minecraft.custom:minecraft.interact_with_crafting_table|minecraft.custom:minecraft.interact_with_furnace|minecraft.custom:minecraft.jump|minecraft.custom:minecraft.leave_game|minecraft.custom:minecraft.minecart_one_cm|minecraft.custom:minecraft.mob_kills|minecraft.custom:minecraft.open_chest|minecraft.custom:minecraft.open_enderchest|minecraft.custom:minecraft.open_shulker_box|minecraft.custom:minecraft.pig_one_cm|minecraft.custom:minecraft.play_noteblock|minecraft.custom:minecraft.play_one_minute|minecraft.custom:minecraft.play_record|minecraft.custom:minecraft.player_kills|minecraft.custom:minecraft.pot_flower|minecraft.custom:minecraft.sleep_in_bed|minecraft.custom:minecraft.sneak_time|minecraft.custom:minecraft.sprint_one_cm|minecraft.custom:minecraft.swim_one_cm|minecraft.custom:minecraft.talked_to_villager|minecraft.custom:minecraft.time_since_death|minecraft.custom:minecraft.traded_with_villager|minecraft.custom:minecraft.trigger_trapped_chest|minecraft.custom:minecraft.tune_noteblock|minecraft.custom:minecraft.use_cauldron|minecraft.custom:minecraft.walk_one_cm|minecraft.dropped:|minecraft.killed:|minecraft.killed_by:|minecraft.mined:|minecraft.picked_up:|minecraft.used:|playerKillCount|teamkill.|totalKillCount|trigger|xp|armor.chest|armor.feet|armor.head|armor.legs|container.0|container.1|container.10|container.11|container.12|container.13|container.14|container.15|container.16|container.17|container.18|container.19|container.2|container.20|container.21|container.22|container.23|container.24|container.25|container.26|container.27|container.28|container.29|container.3|container.30|container.31|container.32|container.33|container.34|container.35|container.36|container.37|container.38|container.39|container.4|container.40|container.41|container.42|container.43|container.44|container.45|container.46|container.47|container.48|container.49|container.5|container.50|container.51|container.52|container.53|container.6|container.7|container.8|container.9|enderchest.0|enderchest.1|enderchest.10|enderchest.11|enderchest.12|enderchest.13|enderchest.14|enderchest.15|enderchest.16|enderchest.17|enderchest.18|enderchest.19|enderchest.2|enderchest.20|enderchest.21|enderchest.22|enderchest.23|enderchest.24|enderchest.25|enderchest.26|enderchest.3|enderchest.4|enderchest.5|enderchest.6|enderchest.7|enderchest.8|enderchest.9|horse.0|horse.1|horse.10|horse.11|horse.12|horse.13|horse.14|horse.2|horse.3|horse.4|horse.5|horse.6|horse.7|horse.8|horse.9|horse.armor|horse.chest|horse.saddle|hotbar.0|hotbar.1|hotbar.2|hotbar.3|hotbar.4|hotbar.5|hotbar.6|hotbar.7|hotbar.8|inventory.0|inventory.1|inventory.10|inventory.11|inventory.12|inventory.13|inventory.14|inventory.15|inventory.16|inventory.17|inventory.18|inventory.19|inventory.2|inventory.20|inventory.21|inventory.22|inventory.23|inventory.24|inventory.25|inventory.26|inventory.3|inventory.4|inventory.5|inventory.6|inventory.7|inventory.8|inventory.9|villager.0|villager.1|villager.2|villager.3|villager.4|villager.5|villager.6|villager.7|weapon|weapon.mainhand|weapon.offhand|advancements(?=\\=)|distance(?=\\=)|dx(?=\\=)|dy(?=\\=)|dz(?=\\=)|gamemode(?=\\=)|values|survival|creative|spectator|level(?=\\=)|limit(?=\\=)|name(?=\\=)|nbt(?=\\=)|scores(?=\\=)|sort(?=\\=)|nearest|furthest|random|arbitrary|tag(?=\\=)|team(?=\\=)|type(?=\\=)|x(?=\\=)|x_rotation(?=\\=)|y(?=\\=)|y_rotation(?=\\=)|z(?=\\=)|tag(?=\\=))\b/,token: "property"},
    {regex: /\/(?:advancement|ban|banlist|data|clear|clone|debug|defaultgamemode|deop|difficulty|effect|execute|experience|fill|function|gamemode|gamerule|give|help|kick|kill|list|locate|me|msg|op|pardon|pardon-ip|particle|playsound|publish|recipe|reload|replaceitem|save-all|save-off|save-on|say|scoreboard|seed|setblock|setidletimeout|setworldspawn|spawnpoint|spreadplayers|stop|stopsound|summon|tag|team|teleport|tell|tellraw|time|title|trigger|w|weather|whitelist|worldborder|xp)\b/,token: "command"},
    {regex: /([a-zA-Z0-9]+)(?=\s*\(.*)/,token: "variable"},
    {regex: /(\=|\+\=|\-\=|\*\=|\/\=|\%\=|\+\+|\-\-|\*|\/|\+|\-|\%|\>|\<|\>\=|\<\=|\~|\^|eyes|feet|true|false|\\n|text|extra|color)/,token: ["operator"]},
    {regex: /true|false|undefined/,token: "atom"},
    {regex: /"(?:[^\\]|\\.)*?"/,token: "string"},
    {regex: /[\{\[\(]/,indent: true},
    {regex: /[\}\]\)]/,dedent: true},
    {regex: /(?:\w+)/},
  ],
  comment2: [
    {regex: /(@(author|package|project|since|version|file|repository|author_url|see))(.*)/, token: ["comment2_annountion","comment2_annountion_value"], next: "comment2"},
    {regex: /.*?\*\//, token: "comment2", next: "start"},
    {regex: /./, token: "comment2"},
  ],
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});
(function() {
  "use strict";

  var WORD = /[\w$]+/g, RANGE = 500;

  CodeMirror.registerHelper("hint", "mcscript", function(editor, options) {
    var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var start = cur.ch, end = start;
    while (end < curLine.length && word.test(curLine.charAt(end))) ++end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    var curWord = start != end && curLine.slice(start, end);

    var list = [], seen = {};
    function scan(dir) {
      var line = cur.line, end = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
      for (; line != end; line += dir) {
        var text = editor.getLine(line), m;
        word.lastIndex = 0;
        while (m = word.exec(text)) {
          if ((!curWord || m[0].indexOf(curWord) == 0) && !seen.hasOwnProperty(m[0])) {
            seen[m[0]] = true;
            list.push(m[0]);
          }
        }
      }
    }
    scan(-1);
    scan(1);
    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
  });
})();
