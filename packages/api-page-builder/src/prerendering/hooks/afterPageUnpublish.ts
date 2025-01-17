import { ContextPlugin } from "@webiny/handler";
import { PbContext } from "~/graphql/types";

export default () => {
    return new ContextPlugin<PbContext>(async ({ pageBuilder }) => {
        pageBuilder.onAfterPageUnpublish.subscribe(async ({ page }) => {
            const promises = [];
            promises.push(
                pageBuilder.prerendering.flush({
                    paths: [{ path: page.path }]
                })
            );
            /**
             * Note: special pages (404 / home) cannot be unpublished, that's why
             * there is no special handling regarding that here.
             */
            await Promise.all(promises);
        });
    });
};
