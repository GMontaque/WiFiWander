import React from 'react'
import Continents from '../pages/Continents';
import { Row } from 'react-bootstrap';


const Homepage = () => {
  return (
    <>
      <Row className='margin-5rem'>
        <div>
          <h2 className='title text-center' >Description</h2>
          <div className='mt-5 mb-5 description'>
            <ul >
              <li>
                <h3>Start Your Search</h3>
                <p>Below you will find six continent-based buttons (e.g., South America, Europe). Simply select a continent, then narrow it down by country and city. If your city isn’t listed, you can add it! A search bar is also available for quick access. Once you choose a city, you'll see a list of Wi-Fi spots with key details like name, address, image, and amenities. Each listing links to a more detailed page.</p>
              </li>
              <li className='line'></li>
              <li>
                <h3>Explore Wi-Fi Spots</h3>
                <p>After selecting a city, you'll get a list of Wi-Fi spots with important info like the address, image, and amenities. Each spot features a star rating system based on user feedback to help you find the best location, whether for speed or comfort.</p>
              </li>
              <li className='line'></li>
              <li>
                <h3>Add Your Own Wi-Fi Spot</h3>
                <p>Discovered a great Wi-Fi spot? Add it to Wifi Wander! Create a free account and contribute new spots. If no results appear in your search, simply log in and add your own location to the map.</p>
              </li>
              <li className='line'></li>
              <li>
                <h3>Join the Conversation</h3>
                <p>Every Wi-Fi spot has a comments section where users can share updates about the location, like speed changes or closures. Your feedback keeps the community informed and helps others make better choices.</p>
              </li>
              <li className='line'></li>
              <li>
                <h3>Save Your Favorites</h3>
                <p>Love a Wi-Fi spot? Save it to your favorites with one click. Access your saved spots anytime through your profile for quick reference or planning future visits.</p>
              </li>
              <li className='line'></li>
              <li>
                <h3>Profile</h3>
                <p>Your profile serves as your personal hub. It lists all the Wi-Fi spots you've added and your saved favorites, making it easy to manage your contributions and go-to locations.</p>
              </li>
              <li className='line'></li>
              <li>
                <p>Wifi Wander is about community, collaboration, and connection—both online and offline. Start exploring and help fellow nomads find the best places to stay connected!</p>
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <Row className='margin-5rem'>
        <Continents />
      </Row>
    </>
  )
}

export default Homepage

