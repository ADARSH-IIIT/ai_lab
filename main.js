import bfs from "./bfs.js"
import dfs from "./dfs.js";

const self_made_graph = {   
     
    adjacencyList : {
        '1' : [ '2' , '3' , '4' ] ,
        '2' : [  '1'  ,'5' , '6'  ] ,
        '3' : [  '1' ]  ,

        '4' : [ '1' , '7' , '8' ] ,

        '5' : ['2' , '9' , '10']  ,

        '6' : [ '2' ]  ,

        '7' : [  '4'  , '11'  , '12' ] ,

        '8' : ['4'] ,

        '9' : [ '5' ] ,
        '10' : ['5']  ,

        '11' : ['7'] ,
        '12' : ['7']
        
    }


              }



// console.log(  bfs(self_made_graph , '2')  );

// console.log( dfs( self_made_graph , '1' ) );


