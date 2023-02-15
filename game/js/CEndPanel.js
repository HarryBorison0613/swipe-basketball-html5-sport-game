function CEndPanel(iScore){
    var _oContainer;
    var _oPanelContainer;
    var _oFade;
    var _oButExit;
    var _oButRestart;
    var _oInterface;

    var _pStartPanelPos;
        
    this._init = function(iScore){
        _oContainer = new createjs.Container();        
        s_oStage.addChild(_oContainer);

        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown",function(){});
        _oContainer.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box_big');
        var oPanel = createBitmap(oSprite);  
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        oPanel.x = CANVAS_WIDTH_HALF;
        oPanel.y = CANVAS_HEIGHT_HALF;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        createjs.Tween.get(_oPanelContainer)
            .to({y:0},1000, createjs.Ease.backOut)
            .call(function(){$(s_oMain).trigger("show_interlevel_ad");});
    
        var iX = CANVAS_WIDTH_HALF;
        var iY = CANVAS_HEIGHT_HALF - 160;
        var iWidth = 550;
        var iHeight = 120;
        
        new CTLText(_oPanelContainer, 
            iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
            42, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
            2, 2,
            TEXT_GAMEOVER,
            true, true, true,
            false );    
        
        var iX = CANVAS_WIDTH_HALF;
        var iY = CANVAS_HEIGHT_HALF - 60;
        var iWidth = 550;
        var iHeight = 120;
        
        new CTLText(_oPanelContainer, 
            iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
            36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
            2, 2,
            TEXT_SCORE + iScore,
            true, true, true,
            false ); 
            
        var iX = CANVAS_WIDTH_HALF;
        var iY = CANVAS_HEIGHT_HALF ;
        var iWidth = 550;
        var iHeight = 120;
        
        new CTLText(_oPanelContainer, 
            iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
            36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
            2, 2,
            TEXT_BEST_SCORE + s_iBestScore,
            true, true, true,
            false );   
        
        _oButExit = new CGfxButton(CANVAS_WIDTH_HALF - 190, 830, s_oSpriteLibrary.getSprite('but_home'), _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);        
        
        _oButRestart = new CGfxButton(CANVAS_WIDTH_HALF + 190, 830, s_oSpriteLibrary.getSprite('but_restart'), _oPanelContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        _oInterface = new CInterface(_oContainer);
    };
    
    this.unload = function(){
        createjs.Tween.get(_oFade)
            .to({alpha:0},500);
    
        createjs.Tween.get(_oPanelContainer)
            .to({y:_pStartPanelPos.y},400, createjs.Ease.backIn)
            .call(function(){
                _oButExit.unload(); 
                _oButRestart.unload();
                _oFade.removeAllEventListener();
                s_oStage.removeChild(_oContainer);
                s_oEndPanel = null;        
        }); 
    };
    
    this._onExit = function(){
        this.unload();
        s_oGame.onExit();
    };
    
    this._onRestart = function(){
        this.unload();
        s_oGame.restart();
    };
    
    s_oEndPanel = this;
    
    this._init(iScore);
}

var s_oEndPanel = null;