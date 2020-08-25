import React, { ReactNode } from "react";

import "./PopupMenu.css";

interface PopupMenuProps {
  children: Array<ReactNode>;
  subClass?: string;
}

export default function PopupMenu({ children, subClass }: PopupMenuProps) {
  return (
    <div className={`popup_menu-container ${subClass ? subClass : ""}`}>
      {children}
    </div>
  );
}
