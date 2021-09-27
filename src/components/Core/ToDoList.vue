<template>
    <div>
        <div class="input-container userId">
             
            <input class="input-field" type="number" placeholder="Enter userId to get todos" 
              name="usrid" id="userId" >
            <button @click.prevent="getData">OK </button>
             
        </div>
        <form action="/action_page.php" >
            <header>
              <h2>ToDoApp</h2>
            </header>
            <br>
         
            <div class="input-container">
             
              <input class="input-field" type="text" placeholder="Add your new todo" name="usrnm" id="input">
              <button @click.prevent="addTask">Add </button>
             
            </div>
            <div id="error" >{{error}}</div>  
            <div class="input-container" v-for="task in userTasks" :key="task.id">
         
            <input class="input-field todo" type="text" name="usrnm" disabled
              :value="task['title']"    >
              <input type="checkbox"   :checked="task['completed']" @change="changeCheck" id="check"/>
    
              <button v-if="isEdit===false" @click.prevent="()=>{editTask(task['title'],task['id'],$event)}"> Edit </button>
              <button  v-if="isEdit===true" @click.prevent="()=>{saveTask(task['title'],task['id'],$event)}">Save </button>
             
              <button @click.prevent="()=>{deleteTask(task['id'])}">Delete </button>
             
            </div>


            <button type="submit" class="btn" @click.prevent="deleteAllTasks">Clear All</button>
        </form>
    
    </div>
</template>

<script  > 
import axios from 'axios';
 
export default {
    name:'ToDoList',
   
    data () {
       
    return {
      name:"ToDoList", 
      tasks:[], 
      
      task:String,
      error:"",
      isEdit:false,
      addTsk:{},
      userTasks:[]
       
    }
    },
    methods:{
        
      async getData(){
        var input=document.getElementById("userId");  
         
        await axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((res)=>(
            this.tasks=res.data));
       
       
        console.log(this.tasks)
        var index=this.tasks.length-1;
       
        var ursId=this.tasks[index].userId;
        console.log(index,this.tasks[index])
        if(0<input.value && input.value<=ursId ) { 
            var userTasks=this.tasks.filter(task=>task.userId==input.value);
            console.log(userTasks);
            this.userTasks=userTasks;
        }
        else{
            alert('enter valid data');

        }   
        },
       
      async addTask(){
            this.addTsk={};
            var userId=document.getElementById("userId"); 
            var input=document.getElementById("input"); 
            if(input.value.trim()  !==""){
             if(input.value.length<100) {
                if( this.tasks.length ){
                    var indexElem =this.tasks.length ; 
                    var id = (this.tasks[indexElem-1].id)+1; 
                  
                   
                   
                   
                } 
                else{
                    id=0;
                }
                
                
                
                this.addTsk.userId=userId.value;
                this.addTsk.id=id;
                this.addTsk.title=input.value;
                this.addTsk.completed=false;
                console.log(this.addTsk,this.tasks) ;
                // this.tasks.push(this.addTsk);
                this.tasks.push(this.addTsk);
                await axios.post("https://jsonplaceholder.typicode.com/todos/",this.addTsk)
                .then(res=>{
                  console.log(res.data);
             
                })
                .catch(error=>{
                  console.log(error)
                }) ;
                console.log(this.tasks,input.value ) ;
                input.value="" ; 
                this.error="";
             }
             else{
                this.error="Maximum Data is 100 character"   
             }
            }
            else{
             this.error="Data is required"  
            }
            
            
            
        },
       async deleteAllTasks(){
            var confirmVar= confirm("Are you sure that you want to delete all todos?");
            if (confirmVar){
           
            for (var task in this.tasks){
                console.log(task)
              await axios.delete("https://jsonplaceholder.typicode.com/todos/"+task.id)
              .then(response => {
               
               console.log(response.data);
             });
            }
            this.tasks=[];
            }
        },
       async deleteTask(id){
            
            var newTasks=[];
            newTasks=this.tasks.filter(el=>el.id !== id);
            console.log(id,newTasks);
            this.tasks=newTasks;
            await axios.delete("https://jsonplaceholder.typicode.com/todos/"+id);


       },
       getInput:function(index){
            var inputCollection= document.getElementsByClassName("todo");
            for(var i in inputCollection){
                console.log(i)
                if(i==index )
                   {   
                    
                       var inp=inputCollection[i];
                       
                   }
            }
            return inp;

       },
       editTask(title,id,event){
            
            const index=this.tasks.findIndex(el=> el.title === title);
            console.log(index)
            var inp=this.getInput(index);
           
                       
            console.log(inp,id);
                       
            inp.disabled=false;
            console.log(inp.value);
            this.isEdit=true;
                       
           
            
       },    
      async saveTask(title,id,event){
            const index=this.tasks.findIndex(el=> el.title === title);
           
            var userId=document.getElementById("userId"); 
             
            
            var inp=this.getInput(index);
            
          
                          
            console.log("dblclick");
            if(inp.value.trim()  ==""){
                alert("data is required");
                           
                }   
                       
            else if(inp.value.length>100)  
                alert("enter data less than 100 character")
                        else{   
                           
                        this.tasks[index].title=inp.value; 
                        inp.disabled=true;
                        this.isEdit=false;
                        console.log(inp.value,this.tasks);
                        this.addTsk.userId=userId.value;
                        this.addTsk.id=id;
                        this.addTsk.title=inp.value;
                        this.addTsk.completed=false;
                        console.log(this.addTsk,this.tasks) ;
                        await axios.put("https://jsonplaceholder.typicode.com/todos/"+id,this.addTsk)
                        .then(res=>{console.log(res.data)})
                        
                        } 
          
            
            

            
        
     
        
    },
       changeCheck:function(e ){
           
            console.log(e)
    },
},
     
    // mounted() {
    //     this.getData()
    // },    

     
    
  
   
}

</script>

<style>

* {
    box-sizing: border-box;
} 

.input-container {
    display: flex;
    width: 100%;
    margin-bottom: 0.5%;
}
 
form{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 45%;
    border: 1px solid wheat    ;
    padding: .5% 5% 5% 5%;
    background-image: linear-gradient(#6e0979,#093579,#094979);
    box-shadow:2px whitesmoke;
    border-radius: 15px;
 
}

header{
    color:whitesmoke
}

.input-container{
    padding: 0 5% 2% 5%;

}
 
.icon {
    padding: 4px;
    background: #094979;
    color: white;
    min-width: 40px;
    min-height: 40px;
    text-align: center;
}
 
button{
    margin-left: .5%;
    color: white;
    padding: 3%;
    background-color: #6e0979;
    border: 1px solid #6e0979;
    
    font-size: 1.5vh;
    font-weight: 600;
    
}
 
.input-field {
    width: 100%;
    padding: 2%;
    outline: none;
}

.input-field:focus {
    border: 2px solid #094979 ;
}

 
.btn {
    background-color: #d62121;
    color: white;
    padding: 2%;
    border: none;
    cursor: pointer;
    width: 25%;
    opacity: 0.9;
    border-radius: 10px;
    margin-left:2px;
   
}

.btn:hover,button:hover {
    opacity: 1;
    cursor: pointer;
}
#error{
    color:#d62121;
    font-size: 2.5vh;
    font-weight:600;
} 
#check{
    zoom: 1.5;
    transform: scale(1.5);
    -ms-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    -o-transform: scale(1.5);
    -moz-transform: scale(1.5);
    transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -moz-transform-origin: 0 0;
    margin :.5% 1.7% 0% 0.5%;
    position: sticky;
}
.userId{
    
    margin-left: auto;
    margin-right: auto;
    width: 50%;

}
</style>