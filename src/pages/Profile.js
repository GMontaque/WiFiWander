import React from 'react';
import { Image, Row, Tab, Tabs } from 'react-bootstrap';
import CreatedTab from '../components/CreatedTab';
import FavouritesTab from '../components/FavouritesTab';
import { useCurrentUser } from '../components/CurrentUserContext';

const Profile = () => {
  const currentUser = useCurrentUser();

  return (
    <>
      <Row>
        <Image
          src="https://via.placeholder.com/150"
          className='profile-img'
          roundedCircle
          alt='profile image'
        />
        <h1 className='text-center capitalize wificreation-title' >{currentUser?.username}</h1>
      </Row>
      <Row className='profile-row'>
        <Tabs defaultActiveKey="created" className="mb-3" fill>
          <Tab eventKey="created" title="Created" tabClassName="tab-border">
            <CreatedTab username={currentUser?.username} />
          </Tab>
          <Tab eventKey="favourites" title="Favourites" tabClassName="tab-border">
            <FavouritesTab />
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};

export default Profile;
