//0 通路
//1 壁
//2 位置コンパス
//3 ゴールコンパス
//x4 鍵
//x5 鍵付き扉
//x6 G獲得
//x7 罠
var fl = 10;
var cl = ["青","赤","黄色","緑","水色","紫"];
class Fdata{
	constructor(field,enemy,player,goal){
		this.field = field;
		this.enemy = enemy;
		this.player = player;
		this.goal = goal;
	}
}
var field = 
[
	new Fdata(//1
	[
		[0,0,0,0,0],
		[0,0,2,0,0],
		[0,0,3,0,0],
		[0,0,106,0,0],
		[0,0,0,0,0]
	],
	[[0,0]],
	[2,0],
	[2,4]
	),
	new Fdata(//2
	[
		[0,0,0,0,0],
		[0,106,0,0,0],
		[1,1,1,107,2],
		[0,0,3,0,0],
		[0,107,0,0,0]
	],
	[[0,4]],
	[2,4],
	[0,0]
	),
	new Fdata(//3
	[
		[0,1,0,1,0],
		[1,1,5,1,1],
		[3,0,0,0,2],
		[1,1,106,1,1],
		[0,1,4,1,0]
	],
	[[0,0]],
	[2,2],
	[2,0]
	),
	new Fdata(//4
	[
		[0,0,2,0,0],
		[0,1,1,1,0],
		[0,1,0,106,0],
		[0,1,1,1,0],
		[0,0,3,0,0]
	],
	[[2,2]],
	[0,2],
	[2,2]
	),
	new Fdata(//5
	[
		[0,207,0,0,2],
		[0,0,106,1,0],
		[3,0,1,106,0],
		[0,1,0,0,0],
		[1,0,207,0,0]
	],
	[[4,0]],
	[0,3],
	[1,4]
	),
	new Fdata(//6
	[
		[107,0,0,0,0,206],
		[0,0,107,0,0,0],
		[1,0,0,1,2,0],
		[3,0,5,0,1,0],
		[0,1,0,0,1,0],
		[0,0,1,1,4,0]
	],
	[[4,2]],
	[0,5],
	[3,4]
	),
	new Fdata(//7
	[
		[2,0,0,0,0,0],
		[106,0,0,0,1,57],
		[106,1,3,0,1,57],
		[0,1,0,0,1,57],
		[0,1,1,1,1,0],
		[0,0,0,0,206,0]
	],
	[[0,0]],
	[3,3],
	[5,5]
	),
	new Fdata(//8
	[
		[2,1,0,1,3,1],
		[106,1,106,1,106,1],
		[5,1,15,1,25,1],
		[0,0,24,0,0,0],
		[4,0,0,0,14,0],
		[0,0,107,0,0,107]
	],
	[[5,5]],
	[0,5],
	[2,0]
	),
	new Fdata(//9
	[
		[24,15,106,106,25,0],
		[1,1,0,0,1,1],
		[2,107,0,0,0,106],
		[106,0,0,107,0,3],
		[1,1,0,0,1,1],
		[4,0,106,106,5,14]
	],
	[[5,0]],
	[2,3],
	[5,0]
	),
	new Fdata(//10
	[
		[0,3,0,0,0,0],
		[0,1,5,1,1,1],
		[0,1,0,1,0,1],
		[0,1,0,1,0,1],
		[0,1,15,1,1,1],
		[0,2,0,0,0,4]
	],
	[[5,5]],
	[5,0],
	[2,3]
	),
	new Fdata(//11
	[
		[0,0,0,0,0,0,0],
		[0,0,0,2,0,0,0],
		[0,0,0,0,0,0,0],
		[0,107,0,106,0,107,0],
		[0,0,0,0,0,0,0],
		[0,0,1,3,1,0,0],
		[0,0,1,0,1,0,0],
	],
	[[0,0],[6,6]],
	[3,0],
	[3,6]
	),
	new Fdata(//12
	[
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
	],
	[[4,2],[0,0]],
	[0,5],
	[3,4]
	),
	new Fdata(//13
	[
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
	],
	[[4,2],[0,0]],
	[0,5],
	[3,4]
	),
	new Fdata(//14
	[
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
	],
	[[4,2],[0,0]],
	[0,5],
	[3,4]
	),
	new Fdata(//15
	[
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
	],
	[[4,2],[0,0]],
	[0,5],
	[3,4]
	),
	new Fdata(//11
	[
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0],
	],
	[[4,2],[0,0]],
	[0,5],
	[3,4]
	),
];