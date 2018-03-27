var express=require('express');
var app= express();
var bodyParser = require('body-parser');
var ObjectId=require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var bcrypt=require('bcryptjs');
var jwt = require('jwt-simple');
var JWT_SECRET='catsmeow';

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {
    

    db.collection('meows', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
             
        });
        
    });
                
});



app.use(express.static('public'));
app.use(bodyParser());


app.get('/meows',function(req,res,next){
	
		
   // Connect to the db
MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {
    

    db.collection('meows', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            //console.log(json(items).text);
          //  console.log(res.json(items).text);
         return res.json(items);          
        });
        
    });
                
});
	

});



app.post('/meows',function(req,res,next)
{
      var token=req.headers.authorization;/*['authorization'];*/
       var user = jwt.decode(token, JWT_SECRET);

       

	MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {
    

    db.collection('meows', function (err, collection) {
        	var newmeow={
            text:req.body.newmeow,
            user:user[0]._id,
            username: user[0].name
          }
         
         collection.insert(newmeow,function(err, items) {
            if(err) throw err;    
        return res.send();        
        });
        
    });
return res.send();
});

});
/*sign in page */

app.post('/students',function(req,res,next)
{
    
    MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('student_details', function (err, usercollection) {
                           
                         
                       
                              
                                var newUser= {
                                    id:req.body.id,
                                    username:req.body.username,
                                    gender:req.body.gender,
                                    degree:req.body.degree,
                                    sem:req.body.sem,
                                    hostel:req.body.hostel,
                                    room:req.body.room ,
                                    password:req.body.password,
                                    password1:req.body.password1

                                };
                                  


                                	 usercollection.find({username:req.body.username}).toArray(function(err, items) {

                                      
                                      //if the user already exists, then send error 
                                	 		if(items[0])
                                	 		{
                                	 			/*usercollection.update( { username : req.body.username }, { name : req.body.username, password: req.body.password }, function(err){
                                						if(err) throw err;    
                                    					return res.send();        
                                						} );	*/
                                						
                                					
                                						return res.sendStatus(400);

                                						
                                	 		}
                                	 		else    //insert 
                                	 		{
                                	 			

                                	 			 usercollection.insert(newUser,{w:1},function(err) {
                                    			    if(err) throw err;    
                                   	 				return res.send();        
                                   				 });
                                	 		}

                                	 });
                                                         
                            });
                      
                        
                        
                    });
              
        });
app.post('/admin',function(req,res,next)
{
    
    MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('admin_details', function (err, usercollection) {
                           
                         
                       
                              
                                var newUser= {
                                    id:req.body.id,
                                    username:req.body.username,
                                    password:req.body.password,
                                    password1:req.body.password1

                                };
                                  


                                   usercollection.find({username:req.body.username}).toArray(function(err, items) {

                                      
                                      //if the user already exists, then send error 
                                      if(items[0])
                                      {
                                        /*usercollection.update( { username : req.body.username }, { name : req.body.username, password: req.body.password }, function(err){
                                            if(err) throw err;    
                                              return res.send();        
                                            } );  */
                                            
                                          
                                            return res.sendStatus(400);

                                            
                                      }
                                      else    //insert 
                                      {
                                        

                                         usercollection.insert(newUser,{w:1},function(err) {
                                              if(err) throw err;    
                                            return res.send();        
                                           });
                                      }

                                   });
                                                         
                            });
                      
                        
                        
                    });
              
        });
app.post('/security',function(req,res,next)
{
    
    MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('security_details', function (err, usercollection) {
                           
                         
                       
                              
                                var newUser= {
                                    gid:req.body.gid,
                                    username:req.body.username,
                                    gender:req.body.gender,
                                    add:req.body.add,
                                    work:req.body.work,
                                    post:req.body.post,
                                    password:req.body.password,
                                    password1:req.body.password1

                                };
                                  
                                  


                                   usercollection.find({gid:req.body.gid}).toArray(function(err, items) {

                                      
                                      //if the user already exists, then send error 
                                      if(items[0])
                                      {
                                        /*usercollection.update( { username : req.body.username }, { name : req.body.username, password: req.body.password }, function(err){
                                            if(err) throw err;    
                                              return res.send();        
                                            } );  */
                                            
                                          
                                            return res.sendStatus(400);

                                            
                                      }
                                      else    //insert 
                                      {
                                        

                                         usercollection.insert(newUser,{w:1},function(err) {
                                              if(err) throw err;    
                                            return res.send();        
                                           });
                                      }

                                   });
                                                         
                            });
                      
                        
                        
                    });
              
        });

app.post('/users/update',function(req,res,next)
{


    MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('users', function (err, usercollection) {
                           
                         
                       
                              
                                var newUser= {
                                    username:req.body.username,
                                    password:req.body.password
                                };
                                	usercollection.update( { name : req.body.username }, { name : req.body.username, password: req.body.password }, { upsert : true }, function(err){
                                		if(err) throw err;    
                                    return res.send();        
                                	} );
                                    
                            });
                      
                        
                        
                    });
                return res.send();
        });




app.put('/meows/remove',function(req,res,next)
{
  var token=req.headers.authorization;/*['authorization'];*/
        
   var user = jwt.decode(token, JWT_SECRET);

	MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {
    

    db.collection('meows', function (err, collection) {
        	var meowid=req.body.meow._id;
        	
        
         collection.remove({_id:ObjectId(meowid),user:user[0]._id},{w:1},function(err, items) {
           
            if(err) throw err;    
        return res.send();        
        });
        
    });
return res.send();
});

});


app.put('/students/signin',function(req,res,next)
{
   console.log(req.body.username);
   console.log(req.body.password);

   MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('student_details', function (err, usercollection) {

        usercollection.find({username:req.body.username}).toArray(function(err, items) {
                    

                        if(items[0])
                        {
                             
                              if(items[0].password==req.body.password)
                             {
                                  
                                   console.log('logged in !');
                                  var token=jwt.encode(items,JWT_SECRET);
                                   return res.json({token:token});
                             }
                        else
                        {

                            console.log('wrong pass');
                            return res.sendStatus(400); 
                        }
                              

                        
                        return res.send();                           
                            
                        }
                        else
                        {
                                
                                  return res.sendStatus(400);

                        }
                    

                      /*  bcrypt.compare(req.body.password,items.password,function(err,result){
                          
                         console.log(result);

                            if(result)
                            {
                                      console.log('here');
                                  
                                  return res.send();

                            }
                            else{
                                     console.log('not here');
                                return res.sendStatus(400);

                            }
                        });*/


                        });


                           
                                              
                        
                    });
               
        });

});

app.put('/adminlogin/signin',function(req,res,next)
{
  console.log(req.body.id);
   console.log(req.body.password);

   MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('admin_details', function (err, usercollection) {

        usercollection.find({id:req.body.id}).toArray(function(err, items) {
                    

                        if(items[0])
                        {
                             
                              if(items[0].password==req.body.password)
                             {
                                  
                                   console.log('logged in !');
                                  var token=jwt.encode(items,JWT_SECRET);
                                   return res.json({token:token});
                             }
                        else
                        {

                            console.log('wrong pass');
                            return res.sendStatus(400); 
                        }
                              

                        
                        return res.send();                           
                            
                        }
                        else
                        {
                                
                                  return res.sendStatus(400);

                        }
                    

                      /*  bcrypt.compare(req.body.password,items.password,function(err,result){
                          
                         console.log(result);

                            if(result)
                            {
                                      console.log('here');
                                  
                                  return res.send();

                            }
                            else{
                                     console.log('not here');
                                return res.sendStatus(400);

                            }
                        });*/


                        });


                           
                                              
                        
                    });
               
        });

});


app.put('/seclogin/signin',function(req,res,next)
{
  /*console.log(req.body.id);
   console.log(req.body.password);*/

   MongoClient.connect("mongodb://localhost:27017/ssrss", function (err, db) {




               db.collection('security_details', function (err, usercollection) {

        usercollection.find({gid:req.body.gid}).toArray(function(err, items) {
                    

                        if(items[0])
                        {
                             
                              if(items[0].password==req.body.password)
                             {
                                  
                                   console.log('logged in !');
                                  var token=jwt.encode(items,JWT_SECRET);
                                   return res.json({token:token});
                             }
                        else
                        {

                            console.log('wrong pass');
                            return res.sendStatus(400); 
                        }
                              

                        
                        return res.send();                           
                            
                        }
                        else
                        {
                                
                                  return res.sendStatus(400);

                        }
                    

                      /*  bcrypt.compare(req.body.password,items.password,function(err,result){
                          
                         console.log(result);

                            if(result)
                            {
                                      console.log('here');
                                  
                                  return res.send();

                            }
                            else{
                                     console.log('not here');
                                return res.sendStatus(400);

                            }
                        });*/


                        });


                           
                                              
                        
                    });
               
        });

});






app.listen(3000,function(){
console.log('Listening on port 3000!');
});
/*
app.put('/users/signin',function(req,res,next)
{
  console.log(req.body.username);
   console.log(req.body.password);

     
 MongoClient.connect("mongodb://localhost:27017/mittens", function (err, db) {
    

    db.collection('users', function (err, collection) {
    

      collection.find({username:req.body.username}).toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);
            //console.log(items[0].password);
            console.log(req.body.password);
            bcrypt.compare(req.body.password,'dave5',function(err,result){
                if(result){
                    console.log('yess');
                    return res.send();

                }
                else
                {
                    console.log('no');
                    return res.status(400).send();
                }
            });
                     
            
        });
  });
});
});

*/
    
