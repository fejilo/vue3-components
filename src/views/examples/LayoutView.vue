<template>
  <Container class="layout">
    <Top>
      <Container class="shadow-top">
        This div has a shadow at the bottom.
      </Container>
    </Top>

    <Container class="content">
      <Side class="left-side" position="left">
        <Container style="display: flex; position: absolute">
          <h1>Hello sjajsjs</h1>
        </Container>
      </Side>

      <Middle style="margin-top: 81px">
        <Container class="main-side">
          <h1>Hello sjajsjs</h1>
          <h2>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Why do we use it? It is
            a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like). Where does it come from? Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC. This book is a treatise on the theory of
            ethics, very popular during the Renaissance. The first line of Lorem
            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced below for those interested. Sections 1.10.32 and 1.10.33
            from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from
            the 1914 translation by H. Rackham.
          </h2>
        </Container>
      </Middle>

      <Side style="margin-top: 81px" position="right">
        <h1>Hello sjajsjs</h1>
        <p></p>
      </Side>
    </Container>

    <Bottom>
      <Container class="shadow-bottom">
        This div has a shadow at the bottom.
      </Container>
    </Bottom>
  </Container>
</template>

<script>
/* eslint-disable */
import Container from "@/components/Layout/Container.vue";
import Top from "@/components/Layout/Sections/Top.vue";
import Side from "@/components/Layout/Sections/Side.vue";
import Middle from "@/components/Layout/Sections/Middle.vue";
import Bottom from "@/components/Layout/Sections/Bottom.vue";

export default {
  name: "LayoutView",
  components: {
    Container,
    Top,
    Side,
    Middle,
    Bottom,
  },
  setup() {},
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.main {
  flex: 1;
  background-color: #2ecc71;
  overflow: hidden;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.shadow-bottom {
  width: 100%;
  height: 80px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
}

.shadow-top {
  width: 100%;
  height: 80px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 1;
}

.left-side {
  margin-top: 81px;
}

.main-side {
  overflow-y: scroll;
  max-height: 100%;
  padding: 10px;
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
}

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
