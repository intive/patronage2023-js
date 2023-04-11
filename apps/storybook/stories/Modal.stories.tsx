import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, Modal } from "ui";

export default {
  title: "Modal",
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = ({ ...args }) => (
  <Modal {...args} />
);

export const ModalWithoutHeader = Template.bind({});
ModalWithoutHeader.args = {
  children: (
    <div style={{ width: "320px" }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam
      praesentium perspiciatis consequuntur quas earum dolore excepturi
      assumenda vero atque veritatis nisi nemo, aperiam reprehenderit esse
      laboriosam adipisci non ipsum. Molestiae cupiditate, natus quasi ab optio
      mollitia modi deserunt beatae! Praesentium molestias, quas veniam numquam
      error commodi eum, ullam molestiae, hic provident aperiam at sed. Rerum
      animi repellendus at vero?
    </div>
  ),
};

export const ModalWithHeader = Template.bind({});
ModalWithHeader.args = {
  header: "Modal's header",
  children: (
    <div style={{ width: "320px" }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam
      praesentium perspiciatis consequuntur quas earum dolore excepturi
      assumenda vero atque veritatis nisi nemo, aperiam reprehenderit esse
      laboriosam adipisci non ipsum. Molestiae cupiditate, natus quasi ab optio
      mollitia modi deserunt beatae! Praesentium molestias, quas veniam numquam
      error commodi eum, ullam molestiae, hic provident aperiam at sed. Rerum
      animi repellendus at vero?
    </div>
  ),
};

const TemplateOpenClose: ComponentStory<typeof Modal> = ({ ...args }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button type="primary" onClick={openModal}>
        Open modal
      </Button>
      {modalVisible && <Modal {...args} onClose={closeModal} />}
    </>
  );
};

export const OpenCloseModal = TemplateOpenClose.bind({});
OpenCloseModal.args = {
  header: "Modal's header",
  children: (
    <div style={{ width: "320px" }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quam
      praesentium perspiciatis consequuntur quas earum dolore excepturi
      assumenda vero atque veritatis nisi nemo, aperiam reprehenderit esse
      laboriosam adipisci non ipsum. Molestiae cupiditate, natus quasi ab optio
      mollitia modi deserunt beatae! Praesentium molestias, quas veniam numquam
      error commodi eum, ullam molestiae, hic provident aperiam at sed. Rerum
      animi repellendus at vero?
    </div>
  ),
};
