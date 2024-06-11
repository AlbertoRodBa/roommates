import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const getRandomUser = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results[0];
    return {
      id: uuidv4(),
      nombre: `${user.name.first} ${user.name.last}`,
      email: user.email,
      debe: 0,
      recibe: 0
    };
  } catch (error) {
    throw new Error('Error fetching random user')
  }
};

export { getRandomUser }
