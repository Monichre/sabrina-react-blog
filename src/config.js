// config.js
export const config =  {
	title: "Theresa on the Town",
	
  bucket: {
    slug: 'theresa-on-the-town',
    media_url: 'https://cosmicjs.com/uploads',
    read_key: '6oef9rgZyNa4IFFdyTXudYD6s0lcr5R7kVMz8yRtD0xGda56e0',
    write_key: 'IongJw3zicivfcKhSRVINBFaqTdKnrEjhYc2xxpkhp3Oaqosof'
  },
  email_info : {
    host: 'smtp.gmail.com',
	  port: 465,
	  secure: true,  // secure:true for port 465, secure:false for port 587
	  auth: {
	      user: 'liamhellis@gmail.com',
	      pass: '102IndiaStreet'
	  }
  }
}
