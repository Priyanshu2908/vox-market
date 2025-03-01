import Button from '@/components/Button';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import TextInput from '@/components/TextInput';
import React from 'react';

const Home = () => {

  return (
    <div>

      <h1 className='text-center font-bold my-5 text-3xl'>Home Page</h1>

      <h2 style={{ color: 'red', textAlign: 'center', fontSize: 30 }}>Welcome to React using Next JS</h2>

      <input type="text" className='p-2 border border-gray-800' />

      <button className='global-btn'>Global Button</button>

      <img src="/next.svg" alt="" />

      <Button disabled={true}>My button</Button>
      <Button >Submit</Button>
      <Button disabled={true}>Nice</Button>

      <Card
        title={'my card title'}
        description={'this is a card description'}
        primaryText={'Ok'}
        secondaryText={'Cancel'}
      />


      <TextInput id="name" label="Full Name"
        placeholder='Enter your name'
        disabled={true}
        // readOnly={true}
        value={"Mubassir"}
      />
      

    </div>
  )
}

export default Home;