export { defineAddress, defineAggregateOffer, defineAggregateRating, defineArticle, defineBook, defineBookEdition, defineBreadcrumb, defineComment, defineCourse, defineEvent, defineFoodEstablishment, defineHowTo, defineHowToStep, defineImage, defineItemList, defineJobPosting, defineListItem, defineLocalBusiness, defineMovie, defineOffer, defineOpeningHours, defineOrganization, definePerson, definePlace, defineProduct, defineQuestion, defineReadAction, defineRecipe, defineReview, defineSearchAction, defineSoftwareApp, defineVideo, defineVirtualLocation, defineWebPage, defineWebSite } from '@unhead/schema-org/vue';
export { useConsentScriptTrigger, useAnalyticsPageEvent, useElementScriptTrigger, useScript, useScriptGoogleAnalytics, useScriptPlausibleAnalytics, useScriptClarity, useScriptCloudflareWebAnalytics, useScriptFathomAnalytics, useScriptMatomoAnalytics, useScriptGoogleTagManager, useScriptGoogleAdsense, useScriptSegment, useScriptMetaPixel, useScriptXPixel, useScriptIntercom, useScriptHotjar, useScriptStripe, useScriptLemonSqueezy, useScriptVimeoPlayer, useScriptYouTubePlayer, useScriptGoogleMaps, useScriptNpm, useScriptCrisp } from '#app/composables/script-stubs';
export { isVue2, isVue3 } from 'vue-demi';
export { defineNuxtLink } from '#app/components/nuxt-link';
export { useNuxtApp, tryUseNuxtApp, defineNuxtPlugin, definePayloadPlugin, useRuntimeConfig, defineAppConfig } from '#app/nuxt';
export { requestIdleCallback, cancelIdleCallback } from '#app/compat/idle-callback';
export { setInterval } from '#app/compat/interval';
export { useAppConfig, updateAppConfig } from '#app/config';
export { defineNuxtComponent } from '#app/composables/component';
export { useAsyncData, useLazyAsyncData, useNuxtData, refreshNuxtData, clearNuxtData } from '#app/composables/asyncData';
export { useHydration } from '#app/composables/hydrate';
export { callOnce } from '#app/composables/once';
export { useState, clearNuxtState } from '#app/composables/state';
export { clearError, createError, isNuxtError, showError, useError } from '#app/composables/error';
export { useFetch, useLazyFetch } from '#app/composables/fetch';
export { useCookie, refreshCookie } from '#app/composables/cookie';
export { onPrehydrate, prerenderRoutes, useRequestHeader, useRequestHeaders, useRequestEvent, useRequestFetch, setResponseStatus } from '#app/composables/ssr';
export { onNuxtReady } from '#app/composables/ready';
export { preloadComponents, prefetchComponents, preloadRouteComponents } from '#app/composables/preload';
export { abortNavigation, addRouteMiddleware, defineNuxtRouteMiddleware, setPageLayout, navigateTo, useRoute, useRouter } from '#app/composables/router';
export { isPrerendered, loadPayload, preloadPayload, definePayloadReducer, definePayloadReviver } from '#app/composables/payload';
export { useLoadingIndicator } from '#app/composables/loading-indicator';
export { getAppManifest, getRouteRules } from '#app/composables/manifest';
export { reloadNuxtApp } from '#app/composables/chunk';
export { useRequestURL } from '#app/composables/url';
export { usePreviewMode } from '#app/composables/preview';
export { useId } from '#app/composables/id';
export { useRouteAnnouncer } from '#app/composables/route-announcer';
export { onBeforeRouteLeave, onBeforeRouteUpdate, useLink } from 'vue-router';
export { withCtx, withDirectives, withKeys, withMemo, withModifiers, withScopeId, onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onErrorCaptured, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated, computed, customRef, isProxy, isReactive, isReadonly, isRef, markRaw, proxyRefs, reactive, readonly, ref, shallowReactive, shallowReadonly, shallowRef, toRaw, toRef, toRefs, triggerRef, unref, watch, watchEffect, watchPostEffect, watchSyncEffect, isShallow, effect, effectScope, getCurrentScope, onScopeDispose, defineComponent, defineAsyncComponent, resolveComponent, getCurrentInstance, h, inject, hasInjectionContext, nextTick, provide, defineModel, defineOptions, defineSlots, mergeModels, toValue, useModel, useAttrs, useCssModule, useCssVars, useSlots, useTransitionState, Component, ComponentPublicInstance, ComputedRef, ExtractPropTypes, ExtractPublicPropTypes, InjectionKey, PropType, Ref, MaybeRef, MaybeRefOrGetter, VNode } from 'vue';
export { computedAsync, asyncComputed, computedEager, eagerComputed, computedInject, computedWithControl, controlledComputed, createEventHook, createGlobalState, createInjectionState, createSharedComposable, createUnrefFn, extendRef, isDefined, makeDestructurable, onClickOutside, onKeyStroke, onLongPress, onStartTyping, reactify, createReactiveFn, reactifyObject, reactiveComputed, reactiveOmit, reactivePick, refAutoReset, autoResetRef, refDebounced, useDebounce, debouncedRef, refDefault, refThrottled, useThrottle, throttledRef, refWithControl, controlledRef, resolveRef, resolveUnref, syncRef, syncRefs, templateRef, toReactive, tryOnBeforeMount, tryOnBeforeUnmount, tryOnMounted, tryOnScopeDispose, tryOnUnmounted, unrefElement, until, useActiveElement, useArrayEvery, useArrayFilter, useArrayFind, useArrayFindIndex, useArrayFindLast, useArrayJoin, useArrayMap, useArrayReduce, useArraySome, useArrayUnique, useAsyncQueue, useAsyncState, useBase64, useBattery, useBluetooth, useBreakpoints, useBroadcastChannel, useBrowserLocation, useCached, useClipboard, useCloned, useConfirmDialog, useCounter, useCssVar, useCurrentElement, useCycleList, useDark, useDateFormat, useDebouncedRefHistory, useDebounceFn, useDeviceMotion, useDeviceOrientation, useDevicePixelRatio, useDevicesList, useDisplayMedia, useDocumentVisibility, useDraggable, useDropZone, useElementBounding, useElementByPoint, useElementHover, useElementSize, useElementVisibility, useEventBus, useEventListener, useEventSource, useEyeDropper, useFavicon, useFileDialog, useFileSystemAccess, useFocus, useFocusWithin, useFps, useFullscreen, useGamepad, useGeolocation, useIdle, useInfiniteScroll, useIntersectionObserver, useInterval, useIntervalFn, useKeyModifier, useLastChanged, useLocalStorage, useMagicKeys, useManualRefHistory, useMediaControls, useMediaQuery, useMemoize, useMemory, useMounted, useMouse, useMouseInElement, useMousePressed, useMutationObserver, useNavigatorLanguage, useNetwork, useNow, useObjectUrl, useOffsetPagination, useOnline, usePageLeave, useParallax, usePermission, usePointer, usePointerLock, usePointerSwipe, usePreferredColorScheme, usePreferredContrast, usePreferredDark, usePreferredLanguages, usePreferredReducedMotion, usePrevious, useRafFn, useRefHistory, useResizeObserver, useScreenOrientation, useScreenSafeArea, useScriptTag, useScroll, useScrollLock, useSessionStorage, useShare, useSorted, useSpeechRecognition, useSpeechSynthesis, useStepper, useStorageAsync, useStyleTag, useSupported, useSwipe, useTemplateRefsList, useTextareaAutosize, useTextDirection, useTextSelection, useThrottledRefHistory, useThrottleFn, useTimeAgo, useTimeout, useTimeoutFn, useTimeoutPoll, useTimestamp, useToggle, useToNumber, useToString, useTransition, useUrlSearchParams, useUserMedia, useVibrate, useVirtualList, useVModel, useVModels, useWakeLock, useWebNotification, useWebSocket, useWebWorker, useWebWorkerFn, useWindowFocus, useWindowScroll, useWindowSize, watchArray, watchAtMost, watchDebounced, debouncedWatch, watchIgnorable, ignorableWatch, watchOnce, watchPausable, pausableWatch, watchThrottled, throttledWatch, watchTriggerable, watchWithFilter, whenever } from '@vueuse/core';
export { injectHead, useHead, useSeoMeta, useHeadSafe, useServerHead, useServerSeoMeta, useServerHeadSafe } from '@unhead/vue';
export { default as useApiReference } from '../node_modules/sf-docs-base/composables/useApiReference';
export { useVersions, Versions, VersionContent } from '../node_modules/sf-docs-base/composables/versions';
export { markdownToHtml, highlightBlock } from '../node_modules/sf-docs-base/utils/index';
export { useAlgoliaFacetedSearch } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAlgoliaFacetedSearch';
export { useAlgoliaInitIndex } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAlgoliaInitIndex';
export { useAlgoliaRecommend } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAlgoliaRecommend';
export { useAlgoliaRef } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAlgoliaRef';
export { useAlgoliaSearch } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAlgoliaSearch';
export { useAsyncAlgoliaSearch } from '../node_modules/@nuxtjs/algolia/dist/runtime/composables/useAsyncAlgoliaSearch';
export { updateSiteConfig } from '../node_modules/nuxt-site-config/dist/runtime/nuxt/composables/updateSiteConfig';
export { useNitroOrigin } from '../node_modules/nuxt-site-config/dist/runtime/nuxt/composables/useNitroOrigin';
export { useSiteConfig } from '../node_modules/nuxt-site-config/dist/runtime/nuxt/composables/useSiteConfig';
export { createSitePathResolver, withSiteTrailingSlash, withSiteUrl } from '../node_modules/nuxt-site-config/dist/runtime/nuxt/composables/utils';
export { useGtag } from '../node_modules/nuxt-gtag/dist/runtime/composables/useGtag';
export { useTrackEvent } from '../node_modules/nuxt-gtag/dist/runtime/composables/useTrackEvent';
export { queryContent } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/legacy/composables/query';
export { useContentHelpers } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/helpers';
export { useContentHead } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/head';
export { useContentPreview } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/preview';
export { withContentBase } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/utils';
export { useUnwrap } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/useUnwrap';
export { fetchContentNavigation } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/legacy/composables/navigation';
export { useContentState, useContent } from '../node_modules/sf-docs-base/node_modules/@nuxt/content/dist/runtime/composables/content';
export { flatUnwrap as unwrapSlot } from '../node_modules/sf-docs-base/node_modules/@nuxtjs/mdc/dist/runtime/utils/node';
export { parseMarkdown } from '../node_modules/sf-docs-base/node_modules/@nuxtjs/mdc/dist/runtime/parser';
export { useColorMode } from '../node_modules/@nuxtjs/color-mode/dist/runtime/composables';
export { defineRobotMeta } from '../node_modules/@nuxtjs/robots/dist/runtime/nuxt/composables/defineRobotMeta';
export { useRobotsRule } from '../node_modules/@nuxtjs/robots/dist/runtime/nuxt/composables/useRobotsRule';
export { defineOgImage } from '../node_modules/nuxt-og-image/dist/runtime/nuxt/composables/defineOgImage';
export { defineOgImageComponent } from '../node_modules/nuxt-og-image/dist/runtime/nuxt/composables/defineOgImageComponent';
export { defineOgImageScreenshot } from '../node_modules/nuxt-og-image/dist/runtime/nuxt/composables/defineOgImageScreenshot';
export { useSchemaOrg } from '../node_modules/nuxt-schema-org/dist/runtime/nuxt/imports/useSchemaOrg';
export { useI18n } from '../node_modules/@nuxtjs/seo/dist/runtime/nuxt/composables/polyfills';
export { useBreadcrumbItems } from '../node_modules/@nuxtjs/seo/dist/runtime/nuxt/composables/useBreadcrumbItems';
export { useNuxtDevTools } from '../node_modules/@nuxt/devtools/dist/runtime/use-nuxt-devtools';
export { definePageMeta } from '../node_modules/nuxt/dist/pages/runtime/composables';