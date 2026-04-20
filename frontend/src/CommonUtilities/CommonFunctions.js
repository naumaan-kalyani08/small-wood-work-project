import { message } from "antd";
export const GetCommonFunction = async (apiEndpoint,parameters ={},showMessage = true) => {
    try {
        console.log('API Endpoint:', apiEndpoint);
        const baseUrl = import.meta.env.VITE_APP_API_URL;
        console.log('Base URL:', baseUrl);
        // const apiUrl = `${baseUrl}${apiEndpoint}`
        const apiUrl = new URL(`${baseUrl}${apiEndpoint}`);
        Object.keys(parameters).forEach(key => {
            apiUrl.searchParams.append(key, parameters[key])
        });
        const response = await fetch(apiUrl,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        });
          const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || 'An error occurred while fetching data.';
            if (showMessage) message.error(errorMessage);
            return {
                success: false,
                error: errorMessage
            };                       
        }
        if (showMessage && data.message) {
            message.success(data.message);
        }
        return{
            success: true,
            data 
        }
    } catch (error) {
        console.log(error)
        if(showMessage) message.error(errorMessage)
        return{
        success: false,
        error: errorMessage
        }   
 
    }
}

export const PostCommonFunction = async (apiEndpoint,body,showMessage = true) => {
    try {
        console.log('API Endpoint:', apiEndpoint);
        const baseUrl = import.meta.env.VITE_APP_API_URL;
        console.log('Base URL:', baseUrl);
        const apiUrl = `${baseUrl}${apiEndpoint}`;
        const response = await fetch(apiUrl,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
          const data = await response.json(); 
        if (!response.ok) {
            const errorMessage = data.message || 'An error occurred while fetching data.';
            if (showMessage) message.error(errorMessage);
            return {
                success: false,
                error: errorMessage
            };                       
        }
        if (showMessage && data.message) {
            message.success(data.message);
        }
        return{
            success: true,
            data 
        }
    } catch (error) {
        console.log(error)
        if(showMessage) message.error(errorMessage)
        return{
        success: false,
        error: errorMessage
        }  
}}

export const deleteCommonFUnction = async (apiEndpoint,parameters ={},showMessage = true) => {
    try {
        console.log('API Endpoint:', apiEndpoint);
        const baseUrl = import.meta.env.VITE_APP_API_URL;
        console.log('Base URL:', baseUrl);
        const apiUrl = new URL(`${baseUrl}${apiEndpoint}`);
        Object.keys(parameters).forEach(key => {
            apiUrl.searchParams.append(key, parameters[key])
        });
        const response = await fetch(apiUrl,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        });
          const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || 'An error occurred while fetching data.';
            if (showMessage) message.error(errorMessage);
            return {
                success: false,
                error: errorMessage
            };                       
        }
        if (showMessage && data.message) {
            message.success(data.message);
        }
        return{
            success: true,
            data 
        }
    } catch (error) {
        console.log(error)
        if(showMessage) message.error(errorMessage)
        return{
        success: false,
        error: errorMessage
        }
    }
}