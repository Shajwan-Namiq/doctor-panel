export const taskStatusSvg = {
  Arrive: Arrive(),
  End: End(),
  Start: Start(),
  Waiting: Waiting(),
  Reserve: Reserve(),
};
function Arrive() {
  return `<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="15" r="15" fill="#DB0EFD" fill-opacity="0.47"/>
  <circle cx="15" cy="15" r="10" fill="#DB0EFD"/>
  <path d="M15 11V10M15 20V19M19 15H20M10 15H11M15 11.4C14.288 11.4 13.592 11.6111 12.9999 12.0067C12.4079 12.4023 11.9465 12.9645 11.674 13.6223C11.4016 14.2802 11.3303 15.004 11.4692 15.7023C11.6081 16.4007 11.9509 17.0421 12.4544 17.5456C12.9579 18.0491 13.5993 18.3919 14.2977 18.5308C14.996 18.6697 15.7198 18.5984 16.3777 18.326C17.0355 18.0535 17.5977 17.5921 17.9933 17.0001C18.3889 16.408 18.6 15.712 18.6 15C18.6 14.0452 18.2207 13.1295 17.5456 12.4544C16.8705 11.7793 15.9548 11.4 15 11.4Z" stroke="white" stroke-linecap="square" stroke-linejoin="round"/>
  </svg>
  `;
}
function End() {
  return `<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="15" r="15" fill="#ED7F22" fill-opacity="0.47"/>
  <circle cx="15" cy="15" r="10" fill="#ED7F22"/>
  <path d="M17.5322 15.7158C18.4354 14.6948 20 12.8105 20 12.0211C20 10.9053 18.6129 10 16.9032 10C15.1935 10 13.8064 10.9053 13.8064 12.0211C13.8064 12.8105 15.3709 14.6948 16.2741 15.7158C16.5644 16.0316 17.2579 16.0316 17.5322 15.7158ZM15.4676 12.0211C15.4676 11.5052 16.1127 11.0842 16.9031 11.0842C17.6934 11.0842 18.3386 11.5052 18.3386 12.0211C18.3386 12.5369 17.6934 12.9579 16.9031 12.9579C16.1128 12.9579 15.4676 12.5369 15.4676 12.0211Z" fill="white"/>
  <path d="M17.129 16.6527H12.5645C11.8548 16.6527 11.2581 16.2737 11.2581 15.8C11.2581 15.3264 11.8387 14.9474 12.5645 14.9474H13.4677C13.8225 14.9474 14.0967 14.758 14.0967 14.5369C14.0967 14.3158 13.8065 14.1264 13.4677 14.1264H12.5645C11.1451 14.1264 10 14.8738 10 15.8C10 16.7264 11.1452 17.4737 12.5645 17.4737H17.129C17.8387 17.4737 18.4355 17.8527 18.4355 18.3263C18.4355 18.7895 17.8548 19.1789 17.129 19.1789H13.8226C13.4677 19.1789 13.1935 19.3684 13.1935 19.5895C13.1935 19.8106 13.4838 20 13.8226 20H17.129C18.5484 20 19.6935 19.2526 19.6935 18.3263C19.6935 17.4 18.5483 16.6527 17.129 16.6527Z" fill="white"/>
  </svg>
  `;
}
function Start() {
  return `<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="15" r="15" fill="#22BE60" fill-opacity="0.47"/>
  <circle cx="15" cy="15" r="10" fill="#22BE60"/>
  <path d="M10 13.8889L11.0733 10.8281C11.248 10.3299 11.6932 10 12.1906 10H17.8094C18.3068 10 18.752 10.3299 18.9267 10.8281L20 13.8889M10 13.8889H20M10 13.8889V18.8889M20 13.8889V18.8889M20 18.8889H10M20 18.8889V20H19.0909V18.8889M10 18.8889V20H10.9091V18.8889" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.8181 16.6667C12.0691 16.6667 12.2726 16.4179 12.2726 16.1111C12.2726 15.8043 12.0691 15.5556 11.8181 15.5556C11.567 15.5556 11.3635 15.8043 11.3635 16.1111C11.3635 16.4179 11.567 16.6667 11.8181 16.6667Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.1818 16.6667C18.4329 16.6667 18.6364 16.4179 18.6364 16.1111C18.6364 15.8043 18.4329 15.5556 18.1818 15.5556C17.9308 15.5556 17.7273 15.8043 17.7273 16.1111C17.7273 16.4179 17.9308 16.6667 18.1818 16.6667Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
`;
}
function Waiting() {
  return `<svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="25" fill="#343434" fill-opacity="0.47"/>
  <circle cx="24.9999" cy="25" r="16.6667" fill="#343434"/>
  <path d="M25.0001 16.6667C20.3994 16.6667 16.6667 20.3993 16.6667 25C16.6667 29.6007 20.3994 33.3333 25.0001 33.3333C29.6008 33.3333 33.3334 29.6007 33.3334 25C33.3334 20.3993 29.6008 16.6667 25.0001 16.6667Z" stroke="white" stroke-miterlimit="10"/>
  <path d="M25 18.3333V25.1515H28.6232" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
`;
}
function Reserve() {
  return `<svg width="40" height="40" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="15" r="15" fill="#37D6FF" fill-opacity="0.47"/>
  <circle cx="15" cy="15" r="10" fill="#37D6FF"/>
  <path d="M20 15C20 12.2396 17.7604 10 15 10C12.2396 10 10 12.2396 10 15C10 17.7604 12.2396 20 15 20C17.7604 20 20 17.7604 20 15Z" stroke="white" stroke-miterlimit="10"/>
  <path d="M17.9166 13.3333L15.0033 16.6667L13.7546 15.4167M13.3319 16.6667L12.0833 15.4167M16.2944 13.3333L14.952 14.8698" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </svg>
  `;
}
