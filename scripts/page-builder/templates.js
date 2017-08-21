const defaultTemplate = ({ content, anchors, metadata }) => `
  <link defer rel="import" href="${metadata.pathToRoot}bower_components/polymer/polymer.html" />
  <link defer rel="import" href="${metadata.pathToRoot}bower_components/px-demo/px-demo-footer.html" />
  <link defer rel="import" href="${metadata.pathToRoot}bower_components/px-demo/px-demo-footer.html" />
  <link defer rel="import" href="${metadata.pathToRoot}elements/px-catalog-page/px-catalog-page-behavior.html" />
  <link defer rel="import" href="${metadata.pathToRoot}elements/px-catalog-page/px-catalog-page-elements.html" />
  <link defer rel="import" href="${metadata.pathToRoot}css/px-catalog-page-styles.html" />
  <link defer rel="import" href="${metadata.pathToRoot}css/px-catalog-theme-styles.html" />
  <link defer rel="import" href="${metadata.pathToRoot}css/px-catalog-code-styles.html" />
  ${metadata.otherImports || ''}

  <dom-module id="${metadata.moduleName}">
    <template>
      <style include="px-catalog-page-styles"></style>
      <style include="px-catalog-code-styles"></style>
      <style include="px-catalog-theme-styles"></style>

      <div class="page">
        ${anchors.length ? anchorListPartial(anchors) : ''}
        <div class="page-content">
          <h2 class="page-title">${metadata.title}</h2>
          ${metadata.updated ? `<p class="page-updated">Last updated ${metadata.updated}</p>` : ''}
          ${content}
        </div>
      </div>
      <px-demo-footer></px-demo-footer>
    </template>
    <script>
      Polymer({
        is: '${metadata.moduleName}',
        behaviors: [PxCatalogBehavior.Page],
        ${metadata.script || ''}

      });

    </script>
  </dom-module>
`;

const anchorListPartial = anchors => `
  <div class="page-anchors" id="toc">
    <ul class="toc">
      ${anchors.map(anchorItemPartial).join('')}
    </ul>
  </div>
`;

const anchorItemPartial = ({title, slug, children}) => `
  <li class="toc__item">
    <a class$="toc__item__link [[_getTocLinkClassName('#${slug}', activeAnchor)]]" href="#" anchor="#${slug}" on-tap="_handleAnchorTapped">${title}</a>
    ${children && children.length ? `<ul class="toc">${children.map(anchorItemPartial).join('')}</ul>` : ''}
  </li>
`;

exports = module.exports = {
  default: defaultTemplate
};
