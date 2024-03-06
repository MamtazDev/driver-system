import instance from "@/hooks/instance";


// NOTIFICATIONS
export const NotificationsCreate = async(body)=>{
    const response = await instance.post('/api/notifications/create', body);
     return response;
}
export const NotificationsGets = async()=>{
     const response  = await instance.get('/api/notifications/get');
     return response;
}
export const NotificationsGetByUser = async(userId)=>{
     const response  = await instance.get(`/api/notifications/getByUser/${userId}`);
     return response;
}
export const DeleteNotification = async(notificationId)=>{
     const response  = await instance.get(`/api/notifications/delete/${notificationId}`);
     return response;
}