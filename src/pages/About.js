import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import boss from '../assets/boss.jpg'
import team from '../assets/team.jpg'
import teamPhoto1 from '../assets/group-photo.jpg'
import teamPhoto2 from '../assets/man-at-table.jpg'
import teamPhoto3 from '../assets/man-on-sofa.jpg'
import teamPhoto4 from '../assets/man-outside.jpg'
import teamPhoto5 from '../assets/man-with-cat.jpg'
import teamPhoto6 from '../assets/team-working.jpg'


const About = () => {
  return (
    <>
      <Row>
        <h1 className='text-center mt-4 mb-4'>About page</h1>
        <div>
          <div className='about-boss-img'>
            <Image src={boss} className='img-fluid' />
          </div>

          <div className='about-text'>
            <h3 className='about-subhead'>Lorenzo Diana</h3>
            <p>Welcome to our digital platform, tailored specifically for digital nomads and remote workers seeking
              the best Wi-Fi spots around the world. Our website is designed to make your search for optimal work
              environments as easy and efficient as possible, no matter where you are. Whether you're exploring a
              new city or settling into a different country, our website allows you to quickly search for cities
              and find the perfect Wi-Fi locations to suit your needs. Start your search by region—like South America
              or Europe—and then narrow it down by country and city. Our intuitive search bar on the homepage allows
              you to easily find cities by name, with results showing available Wi-Fi spots, or an option to add
              a new location if you can't find what you're looking for. Once logged in, users can contribute to our
              growing community by adding new Wi-Fi spots, ensuring the platform remains a dynamic and up-to-date
              resource. Each Wi-Fi spot is rated by users with a star ranking system, helping you to quickly identify
              the quality of the Wi-Fi signal. Additionally, icons display extra amenities such as coffee availability,
              outdoor seating, or private rooms, making it easy for you to choose a location that meets all your requirements.
              Engagement is key to our platform's success. That's why we've incorporated features like commenting
              under each city post, allowing users to share real-time updates and information, such as whether a
              location has closed or changed its Wi-Fi policy. A "favorites" section in each user profile helps
              keep track of preferred spots, while a liking system highlights the most popular places based on
              user feedback. Our goal is to build a robust community where users can share and find valuable
              information to enhance their remote working experience. Join us today to discover, rate, and
              review the best Wi-Fi locations worldwide, and help others make the most of their digital journeys.
            </p>
          </div>
        </div>
        <div className="team-img">
          <Image src={team} className="full-width-img" />
        </div>
        <p className='team-bio'>Our team is a diverse group of seven digital nomads who share a passion for travel, technology,
          and the freedom to work from anywhere in the world. Each member brings a unique perspective and
          skill set to the table, from web development and design to content creation and marketing, making
          our platform a true reflection of the varied experiences and expertise we all bring as remote
          professionals. We first connected in a digital nomad community forum, where discussions often
          revolved around the challenges of finding reliable Wi-Fi spots while on the move. Realizing we all
          faced similar struggles and shared a common goal to help fellow nomads, we decided to pool our
          talents and create a solution that would benefit the entire digital nomad community. Through
          countless virtual meetings across different time zones, from bustling city cafes to tranquil
          beach huts, we collaborated to build a website that not only helps others find the best Wi-Fi
          spots but also fosters a sense of community among remote workers.Our journey together has been
          fueled by our shared values of flexibility, innovation, and community spirit. We understand the
          unique needs of digital nomads because we live that life ourselves. We’re committed to continuously
          improving and expanding our platform to ensure it remains an invaluable resource for those who choose
          the path of freedom and exploration in their professional lives. Join us as we navigate the world,
          one Wi-Fi spot at a time!</p>

        <div className="team-photos">
          <Col md={6} className="team-photo-wrapper left">
            <Image src={teamPhoto1} className="team-photo" />
          </Col>
          <Col md={6} className="team-photo-wrapper right">
            <Image src={teamPhoto2} className="team-photo" />
          </Col>
          <Col md={6} className="team-photo-wrapper left">
            <Image src={teamPhoto3} className="team-photo" />
          </Col>
          <Col md={6} className="team-photo-wrapper right">
            <Image src={teamPhoto4} className="team-photo" />
          </Col>
          <Col md={6} className="team-photo-wrapper left">
            <Image src={teamPhoto5} className="team-photo" />
          </Col>
          <Col md={6} className="team-photo-wrapper right">
            <Image src={teamPhoto6} className="team-photo" />
          </Col>
        </div>
      </Row>
    </>
  )
}

export default About