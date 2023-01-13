import React from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const CounterUp = ({ numberUser }) => {
  const [counterOn, setCounterOn] = React.useState(false);
 const [number, setNumber] = React.useState(numberUser);
  return (
    <>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <h2 class="text-green-800 text-4xl font-bold">
           
          {counterOn && (
            <CountUp start={1} end={number} suffix="k" duration={2} delay={0} />
          )}
        </h2>
      </ScrollTrigger>
    </>
  );
};

export default CounterUp;
