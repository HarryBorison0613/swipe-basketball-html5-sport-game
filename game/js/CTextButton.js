function CTextButton(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize, oContainer) {
    var _aParams;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oContainer;
    var _oMouseDown;
    var _oMouseUp;

    this._init = function (iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize) {
        _aParams = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oButtonBg = createBitmap(oSprite);
        
        var iX = oSprite.width / 2;
        var iY = Math.floor((oSprite.height) / 2);
        var iWidth = 500;
        var iHeight = 100;

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.addChild(oButtonBg);

        _oContainer.addChild(_oButton);
        
        _oText = new CTLText(_oContainer, 
            iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
            50, "center", szColor, szFont, 1,
            2, 2,
            szText,
            true, true, true,
            false );    

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oMouseDown);
        _oButton.off("pressup", _oMouseUp);

        _oContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this._initListener = function () {
        _oMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        
        playSound("click", 1, false);
        
        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams[ON_MOUSE_DOWN]);
        }
    };


    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };

    this.setTextPosition = function (iY) {
        _oText.y = iY;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };

    _oContainer = oContainer;
    
    this._init(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize);

    return this;

}
