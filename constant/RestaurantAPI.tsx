import Cookies from "js-cookie";

const token = Cookies.get('token');
// ID of the restaurant
const getRestaurantID = async () => {
    const response = await fetch('http://127.0.0.1:8080/api/user/get_user', {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    if (response.ok) {
        return data.userData.restaurant_id
    } else {
        console.log(data.error)
    }
}
//update restaurant data
export const createRestaurant = async (data: any) => {
    if (token) {
        const resID = await getRestaurantID()
        const response = await fetch(`http://127.0.0.1:8080/api/restaurant/${resID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.message)
            alert(data.message)
        } else {
            console.error('Error fetching data');
        }
    }

}

export const createCategoryList = async () => {
    const categoryData = ["Món chính", "Món phụ", "Tráng miệng", "Đồ uống", "Đặc biệt", "Combo"];

    if (token) {
        const resID = await getRestaurantID()
        const response = await fetch(`http://127.0.0.1:8080/api/restaurant/${resID}/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    }

}