import React from 'react';
import { Button } from '@ui/components/Button';

export default function Home(): React.ReactElement {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <Button variant='default' size='default'>intra</Button>
    </div>
  );
}
