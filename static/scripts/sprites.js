var Sprites = {
    loadTextures: function(app){
        var textures = {
            app: app,
            ele: document.getElementById('canvas'),
            dubPills: [],
            sinPills: [],
            aBlocks: [],
            marios: [],
            pillBottles: [],
            bgs: [],
            spriteBg: null,
            bottle: null,
        };

        //Creating pixi canvas and fitting it to screen
        var elem = document.getElementById('canvas');
        
        elem.appendChild(app.view);
        textures.ele = elem;

        var textureCa = PIXI.utils.TextureCache['images/bgsheet.png'];
        
        var x = 13, y = 136, width = 17, height = 9;
        //Getting double pills
        for(var i= 0; i < 3; i++){
            for(var w = 0; w < 3; w++){
                textures.dubPills.push(genNewTexRec(x + (width * w) + (2 * w) ,y + (height * i) + (2 * i), width, height, textureCa));
            }
        }
        //getting single pills
        x = 70, y = 136, width = 9, height = 9
        for(var i= 0; i < 3; i++){
            textures.sinPills.push(genNewTexRec(x ,y + (height * i) + (2 * i), width, height, textureCa));
        }
        x = 84, y = 138
        //getting alien blocks
        for(var i= 0; i < 3; i++){
            for(var w = 0; w < 2; w++){
                textures.aBlocks.push(genNewTexRec(x + (width * w) + (2 * w),y + (height * i) + (2 * i), width, height, textureCa));
            }
        }
        //1st mario. Goes from top left to right and then the next line
        textures.marios.push(genNewTexRec(15, 48, 25, 40, textureCa));
        textures.marios.push(genNewTexRec(47, 48, 25, 40, textureCa));
        textures.marios.push(genNewTexRec(76, 48, 32, 40, textureCa));
        textures.marios.push(genNewTexRec(13, 89, 25, 38, textureCa));
        textures.marios.push(genNewTexRec(48, 89, 25, 38, textureCa));
        textures.marios.push(genNewTexRec(77, 89, 38, 38, textureCa));

        //Textures for pill bottles
        textures.pillBottles.push(genNewTexRec(13, 187, 80, 176, textureCa));
        textures.pillBottles.push(genNewTexRec(98, 187, 80, 176, textureCa));
        textures.pillBottles.push(genNewTexRec(183, 187, 80, 176, textureCa));

        //Textures for background
        textures.bgs.push(genNewTexRec(5, 373, 256, 224, textureCa));
        textures.bgs.push(genNewTexRec(266, 373, 256, 224, textureCa));
        textures.bgs.push(genNewTexRec(527, 373, 256, 224, textureCa));

        return textures;
    }
};
function genNewTexRec(x, y, width, height, textureCa){
    let newTexture = new PIXI.Texture(textureCa.baseTexture, textureCa.frame);
    let rectangle = new PIXI.Rectangle(x, y, width, height);

    newTexture.frame = rectangle;
    newTexture._updateUvs();
    
    return newTexture;
}

/*
    sprite positions and size
    aliens:
        (x,y)
        people:
            Alien size:
                24 x 24 all
            Blue:
                1: (274, 44)
                            3px between ^V
                2: (301, 44)
                            3px between ^V
                3: (328, 44)
                            5px between ^V
                4: (357, 44)
                            5px between ^V
                5: (386, 44)
                            6px between ^V
                6: (416, 44)
                            ^^These values are the same for all
            yellow:
                1: (274, 73)
                2: (301, 73)
                3: (328, 73)
                4: (357, 73)
                5: (386, 73)
                6: (416, 73)
            red:
                1: (274, 102)
                2: (301, 102)
                3: (328, 102)
                4: (357, 102)
                5: (386, 102)
                6: (416, 102)
        blocks:
            start
                (84,138)
        height is 9px down from bottom of prev sprite to top of next sprite
    pills:
        double-pill size:
            19 x 11
            SHOULD BE 17X9
        single-pill size:
            11 x 11
            start:
                (12, 135)
                each pill is evenly divided 3 by 3
    dr mario:
            1:  24 X 40
                        (15, 48)
            2:  25 X 40
                        (47, 48)
            3:  32 X 40
                        (76, 48)
            4:  25 X 38
                        (13, 89)
            5:  25 x 38
                        (48, 89)
            6:  38 x 38
                        (77, 89)
    pill bottles:
                80x176 all
                play area is 64 pixel wide
            1:  (13, 187)
            2:  (98, 187)
            3:  (183,187)
        
    //TODO: the rest
*/
