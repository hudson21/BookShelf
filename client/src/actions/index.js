import axios from 'axios';

/*================================(BOOKS)===========================================*/ 
export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                         .then(response => {
                            if(list){
                                return [...list,...response.data]
                            }else{
                                return response.data
                            }
                         })
    
    return{
        type:'GET_BOOKS',
        payload:request
    }
}

export function getBookWithReviewer(id){
    //Here we get the information of the book
    const request = axios.get(`/api/getBook?id=${id}`)

    //Here we are using Redux-Thunk
    //We are delaying the execution of the requests 
    //to get done before sending to the reducer
    return (dispatch)=>{
        request.then(({data})=>{
            let book = data;
            
            //Here we get the information of the owner's book
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                 .then(({data})=>{
                    let response = {
                        book,
                        reviewer:data
                    }
                    
                    dispatch({
                        type:'GET_BOOK_WITH_REVIEWER',
                        payload:response
                    })

                 })
        })
    }
}

export function clearBookWithReviewer(){
    return {
        type:'CLEAR_BOOK_WITH_REVIEWER',
        payload:{
            book:{},
            reviewer:{}
        }
    }
}

export function addBook(book){
    const request = axios.post(`/api/book`,book)
                         .then(response => response.data);
    return{
        type:'ADD_BOOK',
        payload:request
    }
}

export function clearNewBook(){
    return{
        type:'CLEAR_NEW_BOOK',
        payload:{}
    }
}

export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
                         .then(response => response.data)
    return {
        type:'GET_BOOK',
        payload:request
    }
}

export function updateBook(data){
    const request = axios.post(`/api/book_update`,data)
                         .then(response => response.data);

    return {
        type:'UPDATE_BOOK',
        payload:request
    }
}

export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`)
                         .then(response => response.data);

    return {
        type:'DELETE_BOOK',
        payload:request
    }
}

export function clearBook(){
    return{
        type:'CLEAR_BOOK',
        payload:{
            book:null,
            updateBook:false,
            postDeleted:false
        }
    }
}
 

/*================================(USER)===========================================*/ 
export function loginUser({email,password}){
    const request = axios.post(`/api/login`,{email,password})
                         .then(response =>response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get(`/api/auth`)
                         .then(response => response.data)
    return {
        type:'USER_AUTH',
        payload:request
    }
}

export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
                         .then(response => response.data);  

    return {
        type:'GET_USER_POSTS',
        payload:request
    }
}

export function getUsers(){
    const request = axios.get(`/api/users`)
                          .then(response => response.data);
    return{
        type:'GET_USERS',
        payload:request
    }
}

export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user)
    
    //Here we are using Redux Thunk
    return (dispatch) =>{
        request.then(({data})=>{
            //This is for avoiding the password length error
            let users = data.success ? [...userList,data.user] :userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }

}
