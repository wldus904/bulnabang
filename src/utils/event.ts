type clickOutSide = () => {};
export const clickOutSide = (ref: ref, clickEvent: () => {}): clickOutSide => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            clickEvent();
        }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
};
