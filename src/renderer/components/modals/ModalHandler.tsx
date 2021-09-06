import React from 'react';

interface HandlerToken {
  index: number;
  component: React.ComponentType<ModalProps>;
  emitter: React.Component;
}

interface ModalProps {
  token: HandlerToken;
}

interface Modal {
  status: boolean;
  component: React.ComponentType<ModalProps>;
  emitter: React.Component;
}

interface Props {
  allowMultiInstance?: boolean;
}

interface State {
  children: Array<Modal>;
}

/**
 * A handy component which handles modals and makes sure they
 * appear on top of everything else.
 */
class ModalHandler extends React.Component<Props, State> {
  static instance: ModalHandler | undefined;

  /**
   * Declares a new modal to the ModalHandler.
   * @param modal the modal which will be added
   * @returns the generated token - it must be saved in order to open/close the modal
   */
  static push(
    modal: React.ComponentType<ModalProps>,
    emitter: React.Component
  ): HandlerToken {
    if (!ModalHandler.instance) {
      throw new Error(
        "MissingInstanciation : Attempting to call method 'push' while ModalHandler has not been instanciated yet."
      );
    }
    const { children } = ModalHandler.instance.state;
    children.push({
      status: false,
      component: modal,
      emitter,
    });
    ModalHandler.instance.setState({ children });
    return {
      index: children.length - 1,
      component: modal,
      emitter,
    };
  }

  private static set(token: HandlerToken, value: boolean) {
    if (!ModalHandler.instance) {
      throw new Error(
        "MissingInstanciation : Attempting to call method 'set' while ModalHandler has not been instanciated yet."
      );
    }
    const { children } = ModalHandler.instance.state;
    if (token.component !== children[token.index].component) {
      throw new Error(
        `Invalid token : component at index ${token.index} didn't match token content.`
      );
    }
    children[token.index].status = value;
    ModalHandler.instance.setState({ children });
  }

  /**
   * Enables/Opens the modal.
   * @param token the token returned by the push() method call.
   */
  static enable(token: HandlerToken) {
    this.set(token, true);
  }

  /**
   * Disables/Closes the modal.
   * @param token the token returned by the push() method call.
   */
  static disable(token: HandlerToken) {
    this.set(token, false);
  }

  /**
   * Creates a modal handler.
   * Warning : by default, only one instance of this class is allowed.
   * To overwrite previously created instances, set the `allowMultiInstance` prop to true.
   * @param props
   */
  constructor(props: Props) {
    super(props);
    const { allowMultiInstance } = this.props;
    if (ModalHandler.instance && !allowMultiInstance) {
      throw new Error(
        'IllegalInstanciation : Attempting to spawn multiple instances of ModalHandler.'
      );
    } else {
      this.state = {
        children: [],
      };
      ModalHandler.instance = this;
    }
  }

  componentWillUnmount() {
    ModalHandler.instance = undefined;
  }

  render() {
    const { children } = this.state;
    return (
      <div className="modal-handler">
        {children.map(
          (child, i) =>
            child.status && (
              // eslint-disable-next-line react/no-array-index-key
              <div className="modal-handler-child" key={`modal-${i}`}>
                <child.component
                  token={{
                    index: i,
                    component: child.component,
                    emitter: child.emitter,
                  }}
                />
              </div>
            )
        )}
      </div>
    );
  }
}

export default ModalHandler;
export { HandlerToken, ModalHandler };
