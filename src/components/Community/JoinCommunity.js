import { message } from "antd";
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function useJoinCommunity() {
  const { userId } = useContext(UserContext);
  const base_url = process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_BASE_URL : process.env.REACT_APP_SERVER_BASE_URL;

  const joinCommunity = async (communityId) => {
    if (!userId) {
      message.error('User is not logged in');
      return;
    }

    try {
      console.log('Sending join request:', { communityId, userId });

      // Check if the user is already a member
      const response = await axios.get(`${base_url}/community/${communityId}/members`);
      const members = response.data.members;
      const isMember = members.some(member => member.id === userId);

      if (isMember) {
        message.warning('You are already a member of this community');
        return;
      }

      // If not a member, send the join request
      await axios.post(`${base_url}/community/join`, { communityId, userId });
      message.success('Joined successfully!');
    } catch (error) {
      console.error('Join request failed:', error.response || error.message);
      message.error('Join unsuccessful!');
    }
  }

  return joinCommunity;
};