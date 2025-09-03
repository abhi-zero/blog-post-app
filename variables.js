const variables = {
    apiUrl : import.meta.env.VITE_API_URL,
    personApiUrl : import.meta.env.VITE_PERSON_API_URL,
    editorApiKey : import.meta.env.VITE_EDITOR_API_KEY,
    dbUrl :  import.meta.env.VITE_APPWRITE_ENDPOINT_URL,
    projectId :  import.meta.env.VITE_APPWRITE_PROJECTID_KEY,
    databaseId :  import.meta.env.VITE_APPWRITE_DATABASE,
    postsId :  import.meta.env.VITE_APPWRITE_POSTS,
}

export default variables
