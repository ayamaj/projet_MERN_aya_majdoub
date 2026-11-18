
import React from 'react';

import { useSelector } from 'react-redux';

export default function NotificationToast() {

  const { message, visible } = useSelector(
    (state) => state.ui
  );

  if (!visible) {
    return null;
  }

  return (

    <div className="notification-toast">

      ✓ {message}

    </div>

  );

}
