'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function TestLuxury() {
  const [test, setTest] = useState(null);
  
  const testFunc = () => {
    return true;
  };

  return (
    <section className="test">
      <div>Test</div>
    </section>
  );
}