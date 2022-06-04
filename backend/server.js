<<<<<<< HEAD
const http = require('http');   
const fsnormal = require('fs')
const fs = require('fs/promises')
=======
const http = require('http'); 
const fs = require('fs/promises');  
const fsnormal = require('fs')
>>>>>>> a5ab2df (added message to homepage)
const os = require('os')
const {Pool} = require('pg') 
const mail = require('nodemailer')   
const formidable = require('formidable')
const bcrypt = require('bcrypt')

process.env.UV_THREADPOOL_SIZE = os.cpus.length;

const pool = new Pool({
<<<<<<< HEAD
user: 'ubuntu',
password: 'password',
database: 'aboxdatabase',
=======
user: 'ayub',
password: 'AYUByusuf1',
database: 'amazonprojectdatabase',
>>>>>>> a5ab2df (added message to homepage)
host: 'localhost',
port: 5432
})

pool.on('error', error=>{response.write(JSON.stringify({message: `database is down`})); response.end(); console.log(error)})

let num = 1;

 const server =  new http.Server() 

 server.on('request', (request, response)=>{  
     const url = request.url.split('/') 
    if (url[2] === 'resgistrationPage'){
        fs.readFile(`..${request.url}`)
        .then(data=>{response.write(data); response.end()})
        .catch(error=>{response.write(JSON.stringify({message: `server is down`})); response.end(); console.log(error)})
    }

    else if(url[2] === 'forgottenPage' && url[4] === 'index.html' && url[5] !== undefined){
        const userid = url[5].substring(1) 
        pool.query(`SELECT * FROM users WHERE id = ${userid};`)
        .then(async (data)=>{
            if (data.rows[0].reset === 'ALLOW'){ 
                const res = await fs.readFile('../frontend/forgottenPage/html/index.html')
                response.write(res);
                response.end()
            }
            else{
                response.writeHead(301, {
<<<<<<< HEAD
                    'location': `https://abox-project.xyz/frontend/signinPage/html/signin.html`, 
=======
                    'location': `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`, 
>>>>>>> a5ab2df (added message to homepage)
                })
                response.end()
            }
        })
        .catch(
            error=>{console.log(error)}
        )
    }



    else if(request.url === '/' || url[1] === 'backend' || url[2] === 'userHomepage' && url[4] === undefined || url[2] === 'forgottenPage' && url[4] === 'index.html' && url[5] === undefined ){
        response.writeHead(301, {
<<<<<<< HEAD
            'location': `https://abox-project.xyz/frontend/signinPage/html/signin.html`, 
=======
            'location': `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`, 
>>>>>>> a5ab2df (added message to homepage)
        })
        response.end()
    }
    else if(url[1] === 'apipost'){


        if(url[2] === 'signin'){ 
            let userReceived = ''; 
            request.on('data', data=>userReceived+=data) 
            request.on('end', ()=>{  
                pool.query(`SELECT * FROM users WHERE email = '${JSON.parse(userReceived).email}';`)
                .then(user=>{ 
                    let result;
                    bcrypt.compare(JSON.parse(userReceived).password, user.rows[0].password)
                    .then(data=>{
                        result = data
                        
                        if(user.rows !== []){ 
                            if(result){
                                pool.query(`UPDATE users SET status = 'SIGNED_IN' WHERE email = '${JSON.parse(userReceived).email}';`)
                                .then(data=>{
                                    return pool.query(`UPDATE users SET reset = 'DONT_ALLOW' WHERE email = '${JSON.parse(userReceived).email}';`)
                                })
                                .then(data=>{
                                    response.write(JSON.stringify({
<<<<<<< HEAD
                                        link: `https://abox-project.xyz/frontend/userHomepage/index.html/??${user.rows[0].id}/${Math.floor(Math.random() * 100000000000000000)}`,
=======
                                        link: `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/userHomepage/index.html/??${user.rows[0].id}/${Math.floor(Math.random() * 100000000000000000)}`,
>>>>>>> a5ab2df (added message to homepage)
                                    }))
                                    response.end()
                                })
                                .catch(error=>{console.log(error); response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end()})
                            }
                            else{
                                response.write(JSON.stringify({message: 'password is incorrect'}))
                                response.end()
                            }
                        }
    
                        else{
                            response.write(JSON.stringify({message: 'user with that email does not exist'}))
                            response.end()
                        }
                    })
                    .catch(error=>{response.write(JSON.stringify({message: `${error}`})); response.end();})
                })
                .catch(error=>{response.write(JSON.stringify({message: `${error}`})); response.end();})
            })    
        }


        else if(url[2] === 'registration'){
            let userRegistered = '';
            request.on('data', data=>userRegistered+=data)
            request.on('end', ()=>{ 
                if(JSON.parse(userRegistered).password.length >= 5){ 
                    bcrypt.hash(JSON.parse(userRegistered).password, 10)
                    .then(hash=>{
                        return pool.query(`INSERT INTO users (name, email, password, status) values('${JSON.parse(userRegistered).name}', '${JSON.parse(userRegistered).email}', '${hash}', 'SIGNED_OUT') RETURNING id;`)
                    })                   
                    .then(data=>{fs.mkdir(`./userfiles/${data.rows[0].id}`, { recursive: true }); return data})
                    .then(data=>{fs.mkdir(`./userfiles/${data.rows[0].id}/uploaded`, { recursive: true }); return data})
                    .then(data=>{fs.mkdir(`./userfiles/${data.rows[0].id}/shared`, { recursive: true }); return data})
                    .then(data=>fs.mkdir(`./userfiles/${data.rows[0].id}/profilepic`, { recursive: true }))
                    .then(data=>{
                        pool.query(`UPDATE users SET reset = 'DONT_ALLOW' WHERE email = '${JSON.parse(userRegistered).email}';`)
                    })
<<<<<<< HEAD
                    .then(data=>{response.write(JSON.stringify({link: `https://abox-project.xyz/frontend/signinPage/html/signin.html`})); response.end()})
=======
                    .then(data=>{response.write(JSON.stringify({link: `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`})); response.end()})
>>>>>>> a5ab2df (added message to homepage)
                    .catch(error=>{
                            response.write(JSON.stringify({error: `${error}`})); response.end(); 
                            console.log(error)
                    })
                }
                else{}
            })
        }

        else if(url[2] === 'signout'){
            let userToSignOut = '';
            request.on('data', data=>userToSignOut+=data)
            request.on('end', ()=>{
                pool.query(`UPDATE users SET status = 'SIGNED_OUT' WHERE id = ${JSON.parse(userToSignOut).user};`)
                .then(data=>{
<<<<<<< HEAD
                    response.write(JSON.stringify({link: `https://abox-project.xyz/frontend/signinPage/html/signin.html`}))
=======
                    response.write(JSON.stringify({link: `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`}))
>>>>>>> a5ab2df (added message to homepage)
                    response.end()
                })
                .catch(error=>{response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end(); })
            })
        }

        else if(url[2] === 'resetpassword'){
            let userToReset = '';
            request.on('data', data=>userToReset+=data)
            request.on('end', ()=>{
                pool.query(`SELECT * FROM users WHERE id = '${JSON.parse(userToReset).dbid}';`)
                .then(data=>{
                    if(JSON.parse(userToReset).newpassword1.length >= 5 && JSON.parse(userToReset).newpassword2 === JSON.parse(userToReset).newpassword1){ 
                        bcrypt.hash(JSON.parse(userToReset).newpassword1, 10)
                        .then(hash=>{
                            return pool.query(`UPDATE users SET password = '${hash}' WHERE id = '${JSON.parse(userToReset).dbid}';`)
                        })   
                        .then(data=>{pool.query(`UPDATE users SET reset = 'DONT_ALLOW' WHERE id = '${JSON.parse(userToReset).dbid}';`)})
<<<<<<< HEAD
                        .then(data=>{response.write(JSON.stringify({link: `https://abox-project.xyz/frontend/signinPage/html/signin.html`})); response.end()})
=======
                        .then(data=>{response.write(JSON.stringify({link: `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`})); response.end()})
>>>>>>> a5ab2df (added message to homepage)
                        .catch(error=>{response.write(JSON.stringify({message: `database issue`})); response.end(); console.log(JSON.stringify({message: `${error}`}))})
                    }
                    else{
                        response.write(JSON.stringify({message: `make sure your password are more than or equal to 6 characters and match`}));
                        response.end()
                    }
                })
                .catch(error=>{
                    response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end();
                })
            })
        }

        else if(url[2] === 'sendemail'){
            let useremail = '';
            request.on('data', data=>useremail+=data)
            request.on('end', ()=>{
                pool.query(`SELECT * FROM users WHERE email = '${JSON.parse(useremail).email}';`)
                .then(data=>{
<<<<<<< HEAD
=======

>>>>>>> a5ab2df (added message to homepage)
                    //send email code
                    const transport = mail.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
<<<<<<< HEAD
                            user: 'email',
                            pass: 'password'
=======
                            user: 'aboxreset@gmail.com',
                            pass: 'aboxproject123?'
>>>>>>> a5ab2df (added message to homepage)
                        }
                    })

                    const mailObject = {
<<<<<<< HEAD
                        from: '<email>',
                        to: `${JSON.parse(useremail).email}`,
                        subject: 'Reset Password',
                        text: `hello, ${data.rows[0].name}\n\nclick on the link below to reset your password:\n\nhttps://abox-project.xyz/frontend/forgottenPage/html/index.html/?${data.rows[0].id}`
                    }

                    transport.sendMail(mailObject)
=======
                        from: '<abox@gmail.com>',
                        to: `${JSON.parse(useremail).email}`,
                        subject: 'Reset Password',
                        text: `hello, ${data.rows[0].name}\n\nclick on the link below to reset your password:\n\nhttp://${os.networkInterfaces().wlan0[0].address}:8081/frontend/forgottenPage/html/index.html/?${data.rows[0].id}`
                    }

                    transport.sendMail(mailObject)

>>>>>>> a5ab2df (added message to homepage)
                })
                .then(data=>{
                    pool.query(`UPDATE users SET reset = 'ALLOW' WHERE email = '${JSON.parse(useremail).email}';`)
                })
                .then(data=>{
                    response.write(JSON.stringify({message:`Click on the link sent to your email to continue in a few minutes`})); 
                    response.end()
                })
<<<<<<< HEAD
                .catch(error=>{response.write(JSON.stringify({message:`user with that email does not exist`, error: `${error}`})); response.end(); console.log(error)})
=======
                .catch(error=>{response.write(JSON.stringify({message:`user with that email does not exist`})); response.end(); console.log(error)})
>>>>>>> a5ab2df (added message to homepage)
            })
        }

        else if(url[2] === 'fileupload'){ 
                const userid = url[3].substring(1)
                const form = new formidable.IncomingForm({ multiples: true });  

                form.parse(request, function(err, fields, files){ 

                    const targetFile = files.fileuploaded.name.replace(/ /g , "-")
                    
                    pool.query(`SELECT * FROM FILES WHERE owner = ${userid} AND name ='${files.fileuploaded.name}' AND folder ='uploaded'`)
                    .then(data=>{
                        if(data.rows[0] === undefined){
                            fs.readFile(files.fileuploaded.path)
                            .then(data=>fs.writeFile(`./userfiles/${userid}/uploaded/${targetFile}`, data)) 
                            .then(data=>fs.unlink(files.fileuploaded.path))
                            .then(data=>{
                                  pool.query(`INSERT INTO files (owner, type, name, mtime, folder) VALUES ('${userid}', '${files.fileuploaded.type}', '${targetFile}', '${files.fileuploaded.lastModifiedDate}', 'uploaded') RETURNING shared_with;`)
                                 .then(data=>{
                                      const obj = {file: files.fileuploaded, message: 'uploaded', shared_with: data.rows[0].shared_with}
                                      obj.file.name = obj.file.name.replace(/ /g , "-")
                                      response.write(JSON.stringify(obj)); 
                                      response.end()
                                  })
                                  .catch(error=>{response.write(JSON.stringify({error: `${error}`, message: 'something went wrong'})); response.end()}) 
                            })
                            .catch(error=>{console.log(error)})
                        }
                        else{
                            response.write(JSON.stringify({message: 'file with that name already exists'}));
                            response.end()
                        }
                    })
                }) 
        }

        else if(url[2] === 'deletefile'){
            const targetUser= url[3];
            const targetFile = url[5].replace(/%20/g , "-")
            const folder = url[4]
            
            fs.rm(`./userfiles/${targetUser}/${folder}/${targetFile}`)
            .then(data=>{
                pool.query(`DELETE FROM files WHERE name = '${targetFile}' AND folder = '${folder}' AND owner = '${targetUser}';`)
                .then(data=>{
                    response.write('file Deleted'); response.end()
                }) 
                .catch(error=>{
                    response.write(JSON.stringify({message: error}));
                    response.end;
                })
            }) 
            .catch(error=>{
                response.write(JSON.stringify({message: error}));
                response.end;
            })
        }

        else if(url[2] === 'profilepic'){
            const userid = url[3].substring(1) 
            const form = new formidable.IncomingForm({ multiples: true });  

                form.parse(request, function(err, fields, files){ 

                    pool.query(`DELETE FROM files WHERE owner = ${userid} AND folder = 'profilepic';`)
                    .then(data=>fs.readdir(`./userfiles/${userid}/profilepic`))
                    .then(data=>{

                        if(data[1] !== undefined){

                            for(i=0; i<= data.length; i++){
                                fs.unlink(`./userfiles/${userid}/profilepic/${data[i]}`)
                                .then(data=>{})
                                .catch(error=>console.log(error))
                            }

                        }
                        
                    })
                    .then(data=>fs.readFile(files.profilepic.path))
                    .then(data=>fs.writeFile(`./userfiles/${userid}/profilepic/pic`, data)) 
                    .then(data=>fs.unlink(files.profilepic.path)) 
                    .then(data=>{
                        pool.query(`INSERT INTO files (owner, type, name, mtime, folder) VALUES ('${userid}', '${files.profilepic.type}', 'pic', '${files.profilepic.lastModifiedDate}', 'profilepic');`)
                        .then(data=>fs.readFile(`./userfiles/${userid}/profilepic/pic`))
                        .then(data=>{response.write(data); response.end();})
                        .catch(error=>{response.write(JSON.stringify({error: error, message: 'something went wrong'})); response.end()}) 
                    })
                    .catch(error=>{response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end();}) 
                }) 
        } 

        else if(url[2] === 'sharefile'){ 
            let from;
            let result;
            const fileToShare = url[5]
            let folder;
            if(url[4] === 'Upload'){
                folder = 'uploaded'
            }
            else{
                folder = url[4]
            }
            let to; 
<<<<<<< HEAD
            pool.query(`SELECT * FROM users WHERE email ='${url[6].slice(0, -1).toLowerCase()}';`)
=======
            pool.query(`SELECT * FROM users WHERE email ='${url[6].slice(0, -3)}';`)
>>>>>>> a5ab2df (added message to homepage)
            .then(data=>{ 
                    to = data.rows[0] 
                    pool.query(`SELECT * FROM users WHERE id = ${url[3]}`)
                    .then(source=>{
                        from = source.rows[0];
                        return fs.readFile(`./userfiles/${url[3]}/${folder.toLowerCase()}/${fileToShare}`)
                    })
                   .then(filedata=>{
                       fs.writeFile(`./userfiles/${data.rows[0].id}/shared/${fileToShare}`, filedata)
                   })
                   .then(()=>{
                        return pool.query(`SELECT * FROM files WHERE owner = '${url[3]}' AND name = '${fileToShare}';`)
                    })
                   .then(data=>{
                        pool.query(`INSERT INTO files (owner, type, name, mtime, folder, shared_by) VALUES ('${to.id}', '${data.rows[0].type}', '${fileToShare}', '${new Date()}', 'shared', '${from.name}');`)
                    })
                    .then(()=>{
                        return pool.query(`SELECT * FROM files WHERE owner = '${url[3]}' AND name = '${fileToShare}';`)
                    })
<<<<<<< HEAD
                    .then(data=>{ 
                        if(data.rows[0].shared_with === null || undefined){
                            pool.query(`UPDATE files SET shared_with = '${to.name}' WHERE owner = ${url[3]} AND name = '${fileToShare}';`)
                        }
                        else if(data.rows[0].shared_with.includes(to.name)){} 
                        else{
                            pool.query(`UPDATE files SET shared_with = '${data.rows[0].shared_with}, ${to.name}' WHERE owner = ${url[3]} AND name = '${fileToShare}';`)   
                        }
                    })
                    .then(data=>{
                        response.write(JSON.stringify({message: `shared ${fileToShare} with ${to.name}`, with: to.name}));
=======
                    .then(data=>{
                        let num = 1;
                        let alreadyTo = data.rows[0].shared_with 
                        if(alreadyTo === null || undefined){
                            result = to.name
                        }
                        pool.query(`UPDATE files SET shared_with = '${result}' WHERE owner = ${url[3]} AND name = '${fileToShare}';`) 
                        return result
                    })
                    .then(data=>{
                        response.write(JSON.stringify({message: `shared ${fileToShare} with ${to.name}`, with: data}));
>>>>>>> a5ab2df (added message to homepage)
                        response.end();
                    })
                   .catch(error=>{
                       if(`${error}` === `TypeError: Cannot read property 'id' of undefined`){
                        response.write(JSON.stringify({message: 'user does not exist', error: `Cannot read property 'id' of undefined`})); response.end();
                       }
                       else{
                        response.write(JSON.stringify({message: 'something went wrong. try again later', error: `${error}`})); response.end(); console.log(error)
                       }
                    })
                
            })
            .catch(error=>{response.write(JSON.stringify({message: 'something went wrong', error: error})); response.end(); console.log(error)})
        }

        else if(url[2] === 'deleteaccount'){
            pool.query(`DELETE FROM files WHERE owner = ${url[3].substring(1)}`)
            .then(data=>{
                return pool.query(`DELETE FROM users WHERE id = ${url[3].substring(1)}`)
            })
            .then(data=>{
               return fs.rmdir(`./userfiles/${url[3].substring(1)}`, {recursive: true})
            })
            .then(data=>{
<<<<<<< HEAD
                response.write(JSON.stringify({link: `https://abox-project.xyz/frontend/goodbyePage/goodbye.html`}))
=======
                response.write(JSON.stringify({link: `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/goodbyePage/goodbye.html`}))
>>>>>>> a5ab2df (added message to homepage)
                response.end()
            })
            .catch(error=>{response.write(JSON.stringify({message: 'domething went wrong', error: `${error}`})); response.end();console.log(error)})
        }

        else if(url[2] === 'updatedetails'){
            let inforeceived = ''; 
            request.on('data', data=>inforeceived += data)
            request.on('end', ()=>{
                if(JSON.parse(inforeceived).field === 'password'){
                    bcrypt.hash(JSON.parse(inforeceived).value, 10)
                    .then(hash=>{
<<<<<<< HEAD
                        return pool.query(`UPDATE users SET password = '${hash}' WHERE id = ${url[3].substring(1)}`)
                    }) 
                    .then(data=>{
                      response.write(JSON.stringify({message:'updated'}))
                      response.end()
                    })
                    .catch(error=>{
                        response.write(JSON.stringify({message:'something went wrong', error: `${error}`}));
                        response.end();
=======
                        return pool.query(`UPDATE users SET password = '${hash}' WHERE id = ${url[3].substring(1)};`)
                    }) 
                    .catch(error=>{
                        response.write(JSON.stringify({message:'something went wrong', error: `${error}`}))
                        response.end()
>>>>>>> a5ab2df (added message to homepage)
                      })
                  }
                  else{
                    pool.query(`UPDATE users SET ${JSON.parse(inforeceived).field} = '${JSON.parse(inforeceived).value}' WHERE id = ${url[3].substring(1)};`)  
                  .then(data=>{
                      response.write(JSON.stringify({message:'updated'}))
                      response.end()
                  })
                  .catch(error=>{
                    response.write(JSON.stringify({message:'something went wrong', error: `${error}`}))
                    response.end()
                  })
                  }
            })
        }

        else if(url[2] === 'checkpassword'){
            let inforeceived = ''; 
            request.on('data', data=>inforeceived += data)
            request.on('end', ()=>{  
               pool.query(`SELECT * FROM users WHERE id = ${JSON.parse(inforeceived).userid};`) 
               .then(data=>{
                  return bcrypt.compare(JSON.parse(inforeceived).password, data.rows[0].password)
               })
               .then(result=>{
                    if(result){
                        response.write(JSON.stringify({message: true}));
                        response.end()
                    }
                    else{
                        response.write(JSON.stringify({message: false}));
                        response.end()
                    }
               })
               .catch(error=>{
                response.write(JSON.stringify({message:'something went wrong', error: `${error}`}))
                response.end()
               })
            })
        }

        else if(url[2] === 'updatefilename'){
            let inforeceived = ''; 
            request.on('data', data=>inforeceived += data)
            request.on('end', ()=>{ 
<<<<<<< HEAD
                pool.query(`UPDATE FILES SET name = '${JSON.parse(inforeceived).new.toLowerCase()}' WHERE owner = ${url[3]} AND name = '${JSON.parse(inforeceived).old}';`)
                .then(data=>{
                    const newname = JSON.parse(inforeceived).new.toLowerCase();
                    return fs.rename(`./userfiles/${url[3]}/${url[4]}/${JSON.parse(inforeceived).old}`, `./userfiles/${url[3]}/${url[4]}/${newname}`)
=======
                pool.query(`UPDATE FILES SET name = '${JSON.parse(inforeceived).new}' WHERE owner = ${url[3]} AND name = '${JSON.parse(inforeceived).old}';`)
                .then(data=>{
                    return fs.rename(`./userfiles/${url[3]}/${url[4]}/${JSON.parse(inforeceived).old}`, `./userfiles/${url[3]}/${url[4]}/${JSON.parse(inforeceived).new}`)
>>>>>>> a5ab2df (added message to homepage)
                })
                .then(data=>{
                    response.write(JSON.stringify({message: 'update successful'}));
                    response.end()
                })
                .catch(error=>{
                    response.write(JSON.stringify({message:'something went wrong', error: `${error}`}))
                    response.end()
                })
            })
            }

    }

    else if(url[1] === 'apiget'){

        const userinfo = {}


        if(url[2] === 'userinfo'){
            const userToGet = url[3] 
            let userinfo = {user: {}};
            pool.query(`SELECT * FROM users WHERE id = ${userToGet};`)
            .then(data=>{ 
                userinfo.user.name = data.rows[0].name
                userinfo.user.email = data.rows[0].email
                pool.query(`SELECT * FROM files WHERE owner = ${userToGet} AND folder != 'profilepic';`)
                .then(data=>{
                    userinfo.files = data.rows
                    response.write(JSON.stringify(userinfo));
                    response.end();
                })
                .catch(
                    error=>{response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end();}
                )
            })
            .catch(
                error=>{response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end();}
            )
        }

        else if (url[2] === 'file'){
             
            const targetUser= url[3];
            const targetFile = url[5]
            const folder = url[4]

            fs.readFile(`./userfiles/${targetUser}/${folder}/${targetFile}`)
            .then(data=>{
                response.setHeader('Content-Disposition', 'attachment')
                response.write(data)
                response.end()
            })
            .catch(error=>{response.write(JSON.stringify({message: 'something went wrong', error: `${error}`})); response.end();})
        }

        else if(url[2] === 'profilepic'){
            const userid = url[3]

                    
                fs.readFile(`./userfiles/${userid}/profilepic/pic`)
                .then(data=>{response.write(data); response.end()})
                .catch(error=>{response.write(JSON.stringify({error: error, message: 'something went wrong'})); response.end()}) 
        }

    }
    
    else if(url[2] !== 'userHomepage' && url[1] !== 'apipost'){    
        fs.readFile(`..${request.url}`)
        .then(data=>{response.write(data); response.end()})
        .catch(error=>{response.write(JSON.stringify({message: `server is down`})); response.end(); console.log(error)})
    }

    else if(url[4] === 'default.png' ){
        fs.readFile(`./default.png`)
                    .then(data=>{response.write(data); response.end()})
                    .catch(error=>{response.write(JSON.stringify({message: `server is down`})); response.end(); console.log(error)})
    }

    
    else if(url[4] !== undefined && url[4][0] === '?'){ 
        const url1 = request.url.replace('??', '?') 
        const url2 = url1.split('/')
        const newid = url2[4].substring(1) 
            pool.query(`SELECT * FROM users WHERE id = '${newid}';`)
            .then(data=>{
                if(data.rows[0].status === "SIGNED_IN"){ 
                    fs.readFile(`../frontend/userHomepage/index.html`)
                    .then(data=>{response.write(data); response.end()})
                    .catch(error=>{response.write(JSON.stringify({message: `server is down`})); response.end(); console.log(error)})
                }
                else{
                    response.writeHead(301, {
<<<<<<< HEAD
                        'location': `https://abox-project.xyz/frontend/signinPage/html/signin.html`, 
=======
                        'location': `http://${os.networkInterfaces().wlan0[0].address}:8081/frontend/signinPage/html/signin.html`, 
>>>>>>> a5ab2df (added message to homepage)
                    })
                    response.end()
                }

            })
            .catch(error=>{response.write(JSON.stringify({message: `server is down`})); response.end(); console.log(error)})
        
    }
    

 })


server.on('error', error=>console.log(error))

server.on('listening', ()=>console.log('server is listening'))

server.listen(8081)



