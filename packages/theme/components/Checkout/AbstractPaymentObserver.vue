<script >
export default {
  abstract: true,
  render() {
    if (this.$slots?.default?.length > 1) {
      throw new Error(
        'AbstractPaymentObserver can have only one payment provider.'
      );
    }

    try {
      return this.$slots?.default;
    } catch (e) {
      throw new Error(
        'AbstractPaymentObserver must have one payment provider.'
      );
    }
  },
  updated() {}
};
</script>
