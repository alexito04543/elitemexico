'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function TestComponent() {
  const [test, setTest] = useState(null);

  const testFunction = () => {
    return true;
  };

  return (
    <section className="test">
      <div>Test</div>
    </section>
  );
}