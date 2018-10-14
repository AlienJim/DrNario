document.mySprites = {
    createSprite : function createSprite(){
        var texture = PIXI.utils.TextureCache['images/bgsheet.png'];
        var x = 12, y = 135, width = 19, height = 11;
        var dubPills = [];

        for(var i= 0; i < 3; i++){
            for(var w = 0; w < 3; w++){
                let newTexture = new PIXI.Texture(texture.baseTexture, texture.frame);
                let rectangle = new PIXI.Rectangle(x + width*i ,y + height*w, width, height);

                newTexture.frame = rectangle;
                //newTexture._updateUvs();

                let sprite = new PIXI.Sprite(newTexture);
                dubPills.push(sprite);
                console.log(sprite.texture, newTexture.frame);
            }
        }
        return dubPills;

        /*
        sprite positions and size
        aliens:
        (x,y)
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

            height is 9px down from bottom of prev sprite to top of next sprite
        pills:
            double-pill size:
                19 x 11
            single-pill size:
                11 x 11
                start:
                    (12, 135)
                    each pill is evenly divided 3 by 3

        //TODO: the rest
        */
    }
};