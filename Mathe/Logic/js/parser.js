

var currentAST = null;

function Node(theAST) {
	var type;
	var children;
	var value;
	var executionCallback;
	var displayName;
	var result;
	this.AST = theAST;
	this.id = guid();
	this.execute = function() {
		if (typeof this.children != 'undefined' && this.children != null) {
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].execute();
			}
		}
		
		this.result = this.executionCallback();
		didUpdateNode(this);
		
		return this.result;
	};
}

var NODE_OP = 0;
var NODE_VAR = 1;

var OP_AND = 0;
var OP_OR = 1;
var OP_XOR = 2;
var OP_NOT = 3;
var OP_IMPLICATION = 4;
var OP_EQUIVALENT = 5;

/**
 * Create a GUID.
 *
 * Use uniqueID() to create a valid ID since it checks for uniquenes
 *
 * Source from http://stackoverflow.com/a/105074/955230
 */
function guid() {
	function s4() {
  	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function createNode(theAST, type, value, executionCallback, displayName, children) {
	var aNewNode = new Node(theAST);
	aNewNode.type = type;
	aNewNode.value = value;
	aNewNode.children = new Array();
	for(var i = 5; i < arguments.length; i++ ) {
		aNewNode.children.push(arguments[i]);
	}
	
	aNewNode.displayName = displayName;
	aNewNode.executionCallback = executionCallback;
	
	return aNewNode;
}

function copyNode(aNode, anAST) {
    if (typeof anAST == 'undefined' || anAST == null)
        anAST = aNode.AST;

    var aNewNode = new Node(anAST);
    aNewNode.type = aNode.type;
    aNewNode.value = aNode.value;
    aNewNode.children = new Array();
    $.each(aNode.children, function(index, theChildNode) {
        aNewNode.children.push(copyNode(theChildNode, anAST));
    });

    aNewNode.displayName = aNode.displayName;
    aNewNode.executionCallback = aNode.executionCallback;

    return aNewNode;
}

var variableValues = new Object();
var predefinedConstants = new Object();

function getVariableValue(aVarName) {
	this.AST.getVariable(aVarName);
}

function setVariableValue(aVariableName, aVariableValue) {
	this.AST.setVariable(aVariableName, aVariableValue);
}

function setConstantValue(aConstantName, aConstantValue) {
	predefinedConstants[aConstantName] = aConstantValue;
}

function andCallback() {
	return this.children[0].result && this.children[1].result;
}

function orCallback() {
	return this.children[0].result || this.children[1].result;
}

function xorCallback() {
	return this.children[0].result != this.children[1].result;
}

function notCallback() {
	return !this.children[0].result;
}

function exclusionCallback() {
	return !(this.children[0].result && this.children[1].result);
}

function implicationCallback() {
	return !this.children[0].result || this.children[1].result;
}

function equivalentCallback() {
	return this.children[0].result == this.children[1].result;
}

function getVariableCallback() {
	return this.AST.getVariableValue(this.value);
}

var parseResult = null;


/*
	Default template driver for JS/CC generated parsers running as
	browser-based JavaScript/ECMAScript applications.
	
	WARNING: 	This parser template will not run as console and has lesser
				features for debugging than the console derivates for the
				various JavaScript platforms.
	
	Features:
	- Parser trace messages
	- Integrated panic-mode error recovery
	
	Written 2007, 2008 by Jan Max Meyer, J.M.K S.F. Software Technologies
	
	This is in the public domain.
*/

var _dbg_withtrace		= false;
var _dbg_string			= new String();

function __dbg_print( text )
{
	_dbg_string += text + "\n";
}

function __lex( info )
{
	var state		= 0;
	var match		= -1;
	var match_pos	= 0;
	var start		= 0;
	var pos			= info.offset + 1;

	do
	{
		pos--;
		state = 0;
		match = -2;
		start = pos;

		if( info.src.length <= start )
			return 19;

		do
		{

switch( state )
{
	case 0:
		if( ( info.src.charCodeAt( pos ) >= 9 && info.src.charCodeAt( pos ) <= 10 ) || info.src.charCodeAt( pos ) == 13 || info.src.charCodeAt( pos ) == 32 ) state = 1;
		else if( info.src.charCodeAt( pos ) == 38 ) state = 2;
		else if( info.src.charCodeAt( pos ) == 40 ) state = 3;
		else if( info.src.charCodeAt( pos ) == 41 ) state = 4;
		else if( info.src.charCodeAt( pos ) == 47 ) state = 5;
		else if( info.src.charCodeAt( pos ) == 61 ) state = 6;
		else if( info.src.charCodeAt( pos ) == 62 ) state = 7;
		else if( ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else if( info.src.charCodeAt( pos ) == 94 ) state = 9;
		else if( info.src.charCodeAt( pos ) == 124 ) state = 10;
		else if( info.src.charCodeAt( pos ) == 126 ) state = 11;
		else state = -1;
		break;

	case 1:
		state = -1;
		match = 1;
		match_pos = pos;
		break;

	case 2:
		state = -1;
		match = 2;
		match_pos = pos;
		break;

	case 3:
		state = -1;
		match = 10;
		match_pos = pos;
		break;

	case 4:
		state = -1;
		match = 11;
		match_pos = pos;
		break;

	case 5:
		state = -1;
		match = 6;
		match_pos = pos;
		break;

	case 6:
		state = -1;
		match = 8;
		match_pos = pos;
		break;

	case 7:
		if( info.src.charCodeAt( pos ) == 45 ) state = 12;
		else state = -1;
		match = 7;
		match_pos = pos;
		break;

	case 8:
		if( ( info.src.charCodeAt( pos ) >= 48 && info.src.charCodeAt( pos ) <= 57 ) || ( info.src.charCodeAt( pos ) >= 65 && info.src.charCodeAt( pos ) <= 90 ) || info.src.charCodeAt( pos ) == 95 || ( info.src.charCodeAt( pos ) >= 97 && info.src.charCodeAt( pos ) <= 122 ) ) state = 8;
		else state = -1;
		match = 9;
		match_pos = pos;
		break;

	case 9:
		state = -1;
		match = 4;
		match_pos = pos;
		break;

	case 10:
		state = -1;
		match = 3;
		match_pos = pos;
		break;

	case 11:
		state = -1;
		match = 5;
		match_pos = pos;
		break;

	case 12:
		if( info.src.charCodeAt( pos ) == 60 ) state = 9;
		else state = -1;
		break;

}


			pos++;

		}
		while( state > -1 );

	}
	while( 1 > -1 && match == 1 );

	if( match > -1 )
	{
		info.att = info.src.substr( start, match_pos - start );
		info.offset = match_pos;
		

	}
	else
	{
		info.att = new String();
		match = -1;
	}

	return match;
}


function __parse( src, err_off, err_la )
{
	var		sstack			= new Array();
	var		vstack			= new Array();
	var 	err_cnt			= 0;
	var		act;
	var		go;
	var		la;
	var		rval;
	var 	parseinfo		= new Function( "", "var offset; var src; var att;" );
	var		info			= new parseinfo();
	
/* Pop-Table */
var pop_tab = new Array(
	new Array( 0/* Program' */, 1 ),
	new Array( 13/* Program */, 1 ),
	new Array( 12/* Expression */, 1 ),
	new Array( 14/* EquivalentExpression */, 3 ),
	new Array( 14/* EquivalentExpression */, 1 ),
	new Array( 15/* OrExpression */, 3 ),
	new Array( 15/* OrExpression */, 3 ),
	new Array( 15/* OrExpression */, 3 ),
	new Array( 15/* OrExpression */, 3 ),
	new Array( 15/* OrExpression */, 1 ),
	new Array( 16/* AndExpression */, 3 ),
	new Array( 16/* AndExpression */, 1 ),
	new Array( 17/* NegExpression */, 2 ),
	new Array( 17/* NegExpression */, 2 ),
	new Array( 17/* NegExpression */, 1 ),
	new Array( 18/* Value */, 3 ),
	new Array( 18/* Value */, 1 )
);

/* Action-Table */
var act_tab = new Array(
	/* State 0 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 1 */ new Array( 19/* "$" */,0 ),
	/* State 2 */ new Array( 19/* "$" */,-1 ),
	/* State 3 */ new Array( 8/* "T_EQUIVALENT" */,11 , 19/* "$" */,-2 , 11/* ")" */,-2 ),
	/* State 4 */ new Array( 7/* "T_IMPLICATION" */,12 , 6/* "T_EXCLUSION" */,13 , 4/* "T_XOR" */,14 , 3/* "T_OR" */,15 , 19/* "$" */,-4 , 8/* "T_EQUIVALENT" */,-4 , 11/* ")" */,-4 ),
	/* State 5 */ new Array( 2/* "T_AND" */,16 , 19/* "$" */,-9 , 8/* "T_EQUIVALENT" */,-9 , 3/* "T_OR" */,-9 , 4/* "T_XOR" */,-9 , 6/* "T_EXCLUSION" */,-9 , 7/* "T_IMPLICATION" */,-9 , 11/* ")" */,-9 ),
	/* State 6 */ new Array( 19/* "$" */,-11 , 8/* "T_EQUIVALENT" */,-11 , 3/* "T_OR" */,-11 , 4/* "T_XOR" */,-11 , 6/* "T_EXCLUSION" */,-11 , 7/* "T_IMPLICATION" */,-11 , 2/* "T_AND" */,-11 , 11/* ")" */,-11 ),
	/* State 7 */ new Array( 10/* "(" */,9 , 9/* "Identifier" */,10 , 5/* "T_NOT" */,7 ),
	/* State 8 */ new Array( 19/* "$" */,-14 , 8/* "T_EQUIVALENT" */,-14 , 3/* "T_OR" */,-14 , 4/* "T_XOR" */,-14 , 6/* "T_EXCLUSION" */,-14 , 7/* "T_IMPLICATION" */,-14 , 2/* "T_AND" */,-14 , 11/* ")" */,-14 ),
	/* State 9 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 10 */ new Array( 19/* "$" */,-16 , 8/* "T_EQUIVALENT" */,-16 , 3/* "T_OR" */,-16 , 4/* "T_XOR" */,-16 , 6/* "T_EXCLUSION" */,-16 , 7/* "T_IMPLICATION" */,-16 , 2/* "T_AND" */,-16 , 11/* ")" */,-16 ),
	/* State 11 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 12 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 13 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 14 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 15 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 16 */ new Array( 5/* "T_NOT" */,7 , 10/* "(" */,9 , 9/* "Identifier" */,10 ),
	/* State 17 */ new Array( 19/* "$" */,-13 , 8/* "T_EQUIVALENT" */,-13 , 3/* "T_OR" */,-13 , 4/* "T_XOR" */,-13 , 6/* "T_EXCLUSION" */,-13 , 7/* "T_IMPLICATION" */,-13 , 2/* "T_AND" */,-13 , 11/* ")" */,-13 ),
	/* State 18 */ new Array( 19/* "$" */,-12 , 8/* "T_EQUIVALENT" */,-12 , 3/* "T_OR" */,-12 , 4/* "T_XOR" */,-12 , 6/* "T_EXCLUSION" */,-12 , 7/* "T_IMPLICATION" */,-12 , 2/* "T_AND" */,-12 , 11/* ")" */,-12 ),
	/* State 19 */ new Array( 11/* ")" */,26 ),
	/* State 20 */ new Array( 7/* "T_IMPLICATION" */,12 , 6/* "T_EXCLUSION" */,13 , 4/* "T_XOR" */,14 , 3/* "T_OR" */,15 , 19/* "$" */,-3 , 8/* "T_EQUIVALENT" */,-3 , 11/* ")" */,-3 ),
	/* State 21 */ new Array( 2/* "T_AND" */,16 , 19/* "$" */,-8 , 8/* "T_EQUIVALENT" */,-8 , 3/* "T_OR" */,-8 , 4/* "T_XOR" */,-8 , 6/* "T_EXCLUSION" */,-8 , 7/* "T_IMPLICATION" */,-8 , 11/* ")" */,-8 ),
	/* State 22 */ new Array( 2/* "T_AND" */,16 , 19/* "$" */,-7 , 8/* "T_EQUIVALENT" */,-7 , 3/* "T_OR" */,-7 , 4/* "T_XOR" */,-7 , 6/* "T_EXCLUSION" */,-7 , 7/* "T_IMPLICATION" */,-7 , 11/* ")" */,-7 ),
	/* State 23 */ new Array( 2/* "T_AND" */,16 , 19/* "$" */,-6 , 8/* "T_EQUIVALENT" */,-6 , 3/* "T_OR" */,-6 , 4/* "T_XOR" */,-6 , 6/* "T_EXCLUSION" */,-6 , 7/* "T_IMPLICATION" */,-6 , 11/* ")" */,-6 ),
	/* State 24 */ new Array( 2/* "T_AND" */,16 , 19/* "$" */,-5 , 8/* "T_EQUIVALENT" */,-5 , 3/* "T_OR" */,-5 , 4/* "T_XOR" */,-5 , 6/* "T_EXCLUSION" */,-5 , 7/* "T_IMPLICATION" */,-5 , 11/* ")" */,-5 ),
	/* State 25 */ new Array( 19/* "$" */,-10 , 8/* "T_EQUIVALENT" */,-10 , 3/* "T_OR" */,-10 , 4/* "T_XOR" */,-10 , 6/* "T_EXCLUSION" */,-10 , 7/* "T_IMPLICATION" */,-10 , 2/* "T_AND" */,-10 , 11/* ")" */,-10 ),
	/* State 26 */ new Array( 19/* "$" */,-15 , 8/* "T_EQUIVALENT" */,-15 , 3/* "T_OR" */,-15 , 4/* "T_XOR" */,-15 , 6/* "T_EXCLUSION" */,-15 , 7/* "T_IMPLICATION" */,-15 , 2/* "T_AND" */,-15 , 11/* ")" */,-15 )
);

/* Goto-Table */
var goto_tab = new Array(
	/* State 0 */ new Array( 13/* Program */,1 , 12/* Expression */,2 , 14/* EquivalentExpression */,3 , 15/* OrExpression */,4 , 16/* AndExpression */,5 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 1 */ new Array(  ),
	/* State 2 */ new Array(  ),
	/* State 3 */ new Array(  ),
	/* State 4 */ new Array(  ),
	/* State 5 */ new Array(  ),
	/* State 6 */ new Array(  ),
	/* State 7 */ new Array( 17/* NegExpression */,17 , 18/* Value */,18 ),
	/* State 8 */ new Array(  ),
	/* State 9 */ new Array( 12/* Expression */,19 , 14/* EquivalentExpression */,3 , 15/* OrExpression */,4 , 16/* AndExpression */,5 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 10 */ new Array(  ),
	/* State 11 */ new Array( 15/* OrExpression */,20 , 16/* AndExpression */,5 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 12 */ new Array( 16/* AndExpression */,21 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 13 */ new Array( 16/* AndExpression */,22 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 14 */ new Array( 16/* AndExpression */,23 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 15 */ new Array( 16/* AndExpression */,24 , 17/* NegExpression */,6 , 18/* Value */,8 ),
	/* State 16 */ new Array( 17/* NegExpression */,25 , 18/* Value */,8 ),
	/* State 17 */ new Array(  ),
	/* State 18 */ new Array(  ),
	/* State 19 */ new Array(  ),
	/* State 20 */ new Array(  ),
	/* State 21 */ new Array(  ),
	/* State 22 */ new Array(  ),
	/* State 23 */ new Array(  ),
	/* State 24 */ new Array(  ),
	/* State 25 */ new Array(  ),
	/* State 26 */ new Array(  )
);



/* Symbol labels */
var labels = new Array(
	"Program'" /* Non-terminal symbol */,
	"WHITESPACE" /* Terminal symbol */,
	"T_AND" /* Terminal symbol */,
	"T_OR" /* Terminal symbol */,
	"T_XOR" /* Terminal symbol */,
	"T_NOT" /* Terminal symbol */,
	"T_EXCLUSION" /* Terminal symbol */,
	"T_IMPLICATION" /* Terminal symbol */,
	"T_EQUIVALENT" /* Terminal symbol */,
	"Identifier" /* Terminal symbol */,
	"(" /* Terminal symbol */,
	")" /* Terminal symbol */,
	"Expression" /* Non-terminal symbol */,
	"Program" /* Non-terminal symbol */,
	"EquivalentExpression" /* Non-terminal symbol */,
	"OrExpression" /* Non-terminal symbol */,
	"AndExpression" /* Non-terminal symbol */,
	"NegExpression" /* Non-terminal symbol */,
	"Value" /* Non-terminal symbol */,
	"$" /* Terminal symbol */
);


	
	info.offset = 0;
	info.src = src;
	info.att = new String();
	
	if( !err_off )
		err_off	= new Array();
	if( !err_la )
	err_la = new Array();
	
	sstack.push( 0 );
	vstack.push( 0 );
	
	la = __lex( info );

	while( true )
	{
		act = 28;
		for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
		{
			if( act_tab[sstack[sstack.length-1]][i] == la )
			{
				act = act_tab[sstack[sstack.length-1]][i+1];
				break;
			}
		}

		if( _dbg_withtrace && sstack.length > 0 )
		{
			__dbg_print( "\nState " + sstack[sstack.length-1] + "\n" +
							"\tLookahead: " + labels[la] + " (\"" + info.att + "\")\n" +
							"\tAction: " + act + "\n" + 
							"\tSource: \"" + info.src.substr( info.offset, 30 ) + ( ( info.offset + 30 < info.src.length ) ?
									"..." : "" ) + "\"\n" +
							"\tStack: " + sstack.join() + "\n" +
							"\tValue stack: " + vstack.join() + "\n" );
		}
		
			
		//Panic-mode: Try recovery when parse-error occurs!
		if( act == 28 )
		{
			if( _dbg_withtrace )
				__dbg_print( "Error detected: There is no reduce or shift on the symbol " + labels[la] );
			
			err_cnt++;
			err_off.push( info.offset - info.att.length );			
			err_la.push( new Array() );
			for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
				err_la[err_la.length-1].push( labels[act_tab[sstack[sstack.length-1]][i]] );
			
			//Remember the original stack!
			var rsstack = new Array();
			var rvstack = new Array();
			for( var i = 0; i < sstack.length; i++ )
			{
				rsstack[i] = sstack[i];
				rvstack[i] = vstack[i];
			}
			
			while( act == 28 && la != 19 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery\n" +
									"Current lookahead: " + labels[la] + " (" + info.att + ")\n" +
									"Action: " + act + "\n\n" );
				if( la == -1 )
					info.offset++;
					
				while( act == 28 && sstack.length > 0 )
				{
					sstack.pop();
					vstack.pop();
					
					if( sstack.length == 0 )
						break;
						
					act = 28;
					for( var i = 0; i < act_tab[sstack[sstack.length-1]].length; i+=2 )
					{
						if( act_tab[sstack[sstack.length-1]][i] == la )
						{
							act = act_tab[sstack[sstack.length-1]][i+1];
							break;
						}
					}
				}
				
				if( act != 28 )
					break;
				
				for( var i = 0; i < rsstack.length; i++ )
				{
					sstack.push( rsstack[i] );
					vstack.push( rvstack[i] );
				}
				
				la = __lex( info );
			}
			
			if( act == 28 )
			{
				if( _dbg_withtrace )
					__dbg_print( "\tError recovery failed, terminating parse process..." );
				break;
			}


			if( _dbg_withtrace )
				__dbg_print( "\tError recovery succeeded, continuing" );
		}
		
		/*
		if( act == 28 )
			break;
		*/
		
		
		//Shift
		if( act > 0 )
		{			
			if( _dbg_withtrace )
				__dbg_print( "Shifting symbol: " + labels[la] + " (" + info.att + ")" );
		
			sstack.push( act );
			vstack.push( info.att );
			
			la = __lex( info );
			
			if( _dbg_withtrace )
				__dbg_print( "\tNew lookahead symbol: " + labels[la] + " (" + info.att + ")" );
		}
		//Reduce
		else
		{		
			act *= -1;
			
			if( _dbg_withtrace )
				__dbg_print( "Reducing by producution: " + act );
			
			rval = void(0);
			
			if( _dbg_withtrace )
				__dbg_print( "\tPerforming semantic action..." );
			
switch( act )
{
	case 0:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 1:
	{
		  parseResult = vstack[ vstack.length - 1 ]; 
	}
	break;
	case 2:
	{
		 rval = vstack[ vstack.length - 1 ]; 
	}
	break;
	case 3:
	{
		 rval = createNode(currentAST, NODE_OP, OP_EQUIVALENT, equivalentCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]);  
	}
	break;
	case 4:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 5:
	{
		 rval = createNode(currentAST, NODE_OP, OP_OR, orCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 6:
	{
		 rval = createNode(currentAST, NODE_OP, OP_XOR, xorCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 7:
	{
		 rval = createNode(currentAST, NODE_OP, OP_OR, exclusionCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 8:
	{
		 rval = createNode(currentAST, NODE_OP, OP_IMPLICATION, implicationCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 9:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 10:
	{
		 rval = createNode(currentAST, NODE_OP, OP_AND, andCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 3 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 11:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 12:
	{
		 rval = createNode(currentAST, NODE_OP, OP_NOT, notCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 13:
	{
		 rval = createNode(currentAST, NODE_OP, OP_NOT, notCallback, vstack[ vstack.length - 2 ], vstack[ vstack.length - 1 ]); 
	}
	break;
	case 14:
	{
		rval = vstack[ vstack.length - 1 ];
	}
	break;
	case 15:
	{
		 rval = vstack[ vstack.length - 2 ]; 
	}
	break;
	case 16:
	{
		
								rval = createNode(currentAST, NODE_VAR, vstack[ vstack.length - 1 ], getVariableCallback, vstack[ vstack.length - 1 ]);
								if (typeof predefinedConstants[vstack[ vstack.length - 1 ]] == 'undefined') {
									currentAST.setVariableValue(vstack[ vstack.length - 1 ], currentAST.defaultVariableValue);
								}
							
	}
	break;
}



			if( _dbg_withtrace )
				__dbg_print( "\tPopping " + pop_tab[act][1] + " off the stack..." );
				
			for( var i = 0; i < pop_tab[act][1]; i++ )
			{
				sstack.pop();
				vstack.pop();
			}
									
			go = -1;
			for( var i = 0; i < goto_tab[sstack[sstack.length-1]].length; i+=2 )
			{
				if( goto_tab[sstack[sstack.length-1]][i] == pop_tab[act][0] )
				{
					go = goto_tab[sstack[sstack.length-1]][i+1];
					break;
				}
			}
			
			if( act == 0 )
				break;
				
			if( _dbg_withtrace )
				__dbg_print( "\tPushing non-terminal " + labels[ pop_tab[act][0] ] );
				
			sstack.push( go );
			vstack.push( rval );			
		}
		
		if( _dbg_withtrace )
		{		
			alert( _dbg_string );
			_dbg_string = new String();
		}
	}

	if( _dbg_withtrace )
	{
		__dbg_print( "\nParse complete." );
		alert( _dbg_string );
	}
	
	return err_cnt;
}




	function LogicAST() {
		this.variableValues = new Object();
		this.topLevelNode = null;
		this.defaultVariableValue = true;

	}

LogicAST.prototype = {
	getVariableValue: function(aVariableName) {
		if (typeof predefinedConstants[aVariableName] != "undefined")
			return predefinedConstants[aVariableName];

		if (typeof this.variableValues[aVariableName] == "undefined")
			return this.defaultVariableValue;

		return this.variableValues[aVariableName];
	},

	setVariableValue: function(aVariableName, aVariableValue) {
		this.variableValues[aVariableName] = aVariableValue;
	}
}

function copyLogicAST(anAST) {
    var newAST = new LogicAST();
    $.each(anAST.variableValues, function(key, value) {
        newAST.setVariableValue(key, value);
    });

    newAST.topLevelNode = copyNode(anAST.topLevelNode, newAST);

	return newAST;
}

function parseString(aString) {
	var error_cnt 	= 0;
	var error_off	= new Array();
	var error_la	= new Array();
	
	variableValues = new Object();

	parseResult = null;
	currentAST = new LogicAST();

	if(( error_cnt = __parse( aString, error_off, error_la )) > 0 )
	{
		var theErrorString = "<div>Es ist ein Fehler aufgetreten:<ul>";
		for( i = 0; i < error_cnt; i++ ) {
			var expectedString = error_la[i].join('", "');
			$.each({'T_OR': '|', 'T_XOR': '^', 'T_AND': '&', 'T_NOT': '~', 'T_EXCLUSION': '/'}, function(key, value){
				expectedString = expectedString.replace(new RegExp(key), value);
			});

			theErrorString += "<li>Unbekanntes Zeichen in der Nähe von \"" + aString.substr(error_off[i], 5) + "\". Eines dieser Zeichen wird erwartet: \"" + expectedString + "\"</li>";
		}

		theErrorString += "</ul>"
		if (theErrorString.search(/\"Identifier\"/) != -1) {
			theErrorString += "Mit \"Identifier\" sind Variablen oder Konstanten (z. Bsp. \"wahr\") gemeint."
		}
		theErrorString += "</div>"
		theErrorString = theErrorString.replace(/\"\$\"/, 'Eingabeende');

		// Clean up and bail.
		variableValues = new Object();
		throw theErrorString;

		return null;
	}

	currentAST.topLevelNode = parseResult;

	return currentAST;
}


