import { useRef, useEffect, useState, useCallback } from "react";
import classes from './scroll-container.module.css';

interface ScrollContainerProps {
  children: JSX.Element[] | undefined
  scrollCta?: string
  outerDivClassName: string
}

const ScrollContainer = ({ children, scrollCta, outerDivClassName }: ScrollContainerProps) => {
  const outerDiv = useRef<HTMLDivElement | null>(null);
  const innerDiv = useRef<HTMLDivElement | null>(null);

  const prevInnerDivHeight = useRef<number | undefined | null>(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv?.current?.clientHeight;
    const innerDivHeight = innerDiv?.current?.clientHeight;
    const outerDivScrollTop = outerDiv?.current?.scrollTop;

    if (
      !prevInnerDivHeight.current ||
      outerDivScrollTop === prevInnerDivHeight.current - (outerDivHeight || 0)
    ) {
      outerDiv?.current?.scrollTo({
        top: innerDivHeight! - outerDivHeight!,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto"
      });
      setShowMessages(true);
    } else {
      setShowScrollButton(true);
    }

    prevInnerDivHeight.current = innerDivHeight;
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv?.current?.clientHeight;
    const innerDivHeight = innerDiv?.current?.clientHeight;

    outerDiv?.current?.scrollTo({
      top: innerDivHeight! - outerDivHeight!,
      left: 0,
      behavior: "smooth"
    });

    setShowScrollButton(false);
  }, []);

  return (
    <div className={`${classes.outerDiv} ${outerDivClassName}`}>
      <div className={classes.innerDiv} ref={outerDiv}>
        <div
          className={classes.messages}
          style={{ opacity: showMessages ? 1 : 0 }}
          ref={innerDiv}
        >
          {children}
        </div>
      </div>

      {scrollCta &&
        <button
          style={{
            transform: "translateX(-50%)",
            opacity: showScrollButton ? 1 : 0,
            pointerEvents: showScrollButton ? "auto" : "none"
          }}
          className={classes.button}
          onClick={handleScrollButtonClick}
        >
          {scrollCta}
        </button>
      }
    </div>
  );
};

ScrollContainer.defaultProps = {
  outerDivClassName: ""
}

export default ScrollContainer;