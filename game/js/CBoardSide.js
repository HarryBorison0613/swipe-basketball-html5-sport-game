function CBoardSide(iX, iY, oParentContainer){
    var _oParentContainer;
    var _oSideShape;
    
    var _iX;
    var _iY;
    
    var _iSideEdgeLeft;
    var _iSideEdgeRight;
    var _iSideEdgeTop;
    var _iSideEdgeBottom;
    
    var _aEdges;
    
    this._init = function(){
        _oParentContainer = oParentContainer;
        _iX = iX;
        _iY = iY;
        
        _oSideShape = new createjs.Shape()
        _oSideShape.graphics.beginFill("blue");
        _oSideShape.graphics.drawRect(0, 0, BOARD_SIDES_SIZE, BOARD_SIDES_SIZE);
        _oSideShape.graphics.endFill();
        _oSideShape.regX = BOARD_SIDES_SIZE/2;
        _oSideShape.regY = BOARD_SIDES_SIZE/2;  
        _oSideShape.x = iX;
        _oSideShape.y = iY;
        _oSideShape.alpha = 0.5;
        _oParentContainer.addChild(_oSideShape);
        //_oSideShape.visible = false;
        
        this.createEdges();
    };
    
    this.createEdges = function(){
        _aEdges = [];
        
        var bVisible = true; // SET TO TRUE FOR DEBUG REASONS
        var iHeightVar = 1;
        
        _iSideEdgeLeft = this.getX() - BOARD_SIDES_SIZE/2;
        _iSideEdgeRight = this.getX() + BOARD_SIDES_SIZE/2;
        _iSideEdgeTop = this.getY() - BOARD_SIDES_SIZE/2;
        _iSideEdgeBottom = this.getY() + BOARD_SIDES_SIZE/2;

        _aEdges[EDGE_LEFT] = new CEdge(_iSideEdgeLeft, _iSideEdgeTop, _iSideEdgeLeft, _iSideEdgeBottom, iHeightVar, bVisible);
        _aEdges[EDGE_RIGHT] = new CEdge(_iSideEdgeRight, _iSideEdgeBottom, _iSideEdgeRight, _iSideEdgeTop, iHeightVar, bVisible);
        _aEdges[EDGE_TOP] = new CEdge(_iSideEdgeRight, _iSideEdgeTop, _iSideEdgeLeft, _iSideEdgeTop, iHeightVar, bVisible);
        _aEdges[EDGE_BOTTOM] = new CEdge(_iSideEdgeLeft, _iSideEdgeBottom, _iSideEdgeRight, _iSideEdgeBottom, iHeightVar, bVisible);
    };
    
    this.getX = function(){
        return _oParentContainer.x + _iX;
    };
    
    this.getY = function(){
        return _oParentContainer.y + _iY;
    };
    
    this.getSideEdges = function(){
        return _aEdges;
    };
    
    this.destroy = function(){
        for (var i = 0; i < _aEdges.length; i++) {
            _aEdges[i].destroy();
        };
        
        _oParentContainer.removeChild(_oSideShape);
    };
    
    this._init();

    return this;
};