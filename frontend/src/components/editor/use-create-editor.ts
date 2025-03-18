"use client";
import { withProps } from "@udecode/cn";
// import { AIChatPlugin, AIPlugin, CopilotPlugin } from "@udecode/plate-ai/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import {
    CodeBlockPlugin,
    CodeLinePlugin,
    CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HeadingPlugin, TocPlugin } from "@udecode/plate-heading/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
    ImagePlugin,
    MediaEmbedPlugin,
    PlaceholderPlugin,
} from "@udecode/plate-media/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    ParagraphPlugin,
    PlateLeaf,
    usePlateEditor,
} from "@udecode/plate/react";
// import { PlaceholderPlugin } from "@udecode/plate-placeholder/react";
import { FixedToolbarPlugin } from "@/components/editor/plugins/fixed-toolbar-plugin";
import { FloatingToolbarPlugin } from "@/components/editor/plugins/floating-toolbar-plugin";
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import {
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react";
import { CaptionPlugin } from "@udecode/plate-caption/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import { CsvPlugin } from "@udecode/plate-csv";
import { DatePlugin } from "@udecode/plate-date/react";
import { DndPlugin } from "@udecode/plate-dnd";
import { DocxPlugin } from "@udecode/plate-docx";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import {
    FontBackgroundColorPlugin,
    FontColorPlugin,
    FontSizePlugin,
} from "@udecode/plate-font/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { LineHeightPlugin } from "@udecode/plate-line-height/react";
import { TodoListPlugin } from "@udecode/plate-list/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { EquationPlugin } from "@udecode/plate-math/react";
import {
    MentionInputPlugin,
    MentionPlugin,
} from "@udecode/plate-mention/react";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { ResetNodePlugin } from "@udecode/plate-reset-node/react";
import { DeletePlugin } from "@udecode/plate-select";
import {
    BlockMenuPlugin,
    BlockSelectionPlugin,
    CursorOverlayPlugin,
} from "@udecode/plate-selection/react";
import {
    SlashInputPlugin,
    SlashPlugin,
} from "@udecode/plate-slash-command/react";
import { TabbablePlugin } from "@udecode/plate-tabbable/react";
import {
    TableCellHeaderPlugin,
    TableCellPlugin,
    TablePlugin,
    TableRowPlugin,
} from "@udecode/plate-table/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";

// import { AILeaf } from "@/components/plate-ui/ai-leaf";
import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ColumnElement } from "@/components/plate-ui/column-element";
import { ColumnGroupElement } from "@/components/plate-ui/column-group-element";
import { CommentLeaf } from "@/components/plate-ui/comment-leaf";
import { DateElement } from "@/components/plate-ui/date-element";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import {
    TableCellElement,
    TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import emojiMartaData, { EmojiMartData } from "@emoji-mart/data";
import { EmojiInputElement } from "../plate-ui/emoji-input-element";
import { SlashInputElement } from "../plate-ui/slash-input-element";

export const useCreateEditor = () => {
    return usePlateEditor({
        plugins: [
            // AIPlugin,
            // AIChatPlugin,
            // CopilotPlugin,
            ParagraphPlugin,
            BlockquotePlugin,
            CodeBlockPlugin,
            HeadingPlugin,
            HorizontalRulePlugin,
            LinkPlugin,
            // LinkPlugin.configure({
            //     render: { afterEditable: () => <LinkFloatingToolbar /> },
            // }),
            ImagePlugin,
            MediaEmbedPlugin,
            ExcalidrawPlugin,
            TogglePlugin,
            ColumnPlugin,
            PlaceholderPlugin,
            CaptionPlugin.configure({
                options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
            }),
            MentionPlugin,
            TablePlugin,
            TodoListPlugin,
            DatePlugin,
            TocPlugin,
            EquationPlugin,
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            StrikethroughPlugin,
            CodePlugin,
            SubscriptPlugin,
            SuperscriptPlugin,
            FontColorPlugin,
            FontBackgroundColorPlugin,
            FontSizePlugin,
            HighlightPlugin,
            KbdPlugin,
            AlignPlugin.configure({
                inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
            }),
            IndentPlugin.configure({
                inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
            }),
            IndentListPlugin.configure({
                inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
            }),
            LineHeightPlugin.configure({
                inject: {
                    nodeProps: {
                        defaultNodeValue: 1.5,
                        validNodeValues: [1, 1.2, 1.5, 2, 3],
                    },
                    targetPlugins: ["p", "h1", "h2", "h3"],
                },
            }),
            DndPlugin.configure({ options: { enableScroller: true } }),
            AutoformatPlugin.configure({
                options: {
                    enableUndoOnDelete: true,
                    rules: [
                        // Usage: https://platejs.org/docs/autoformat
                    ],
                },
            }),
            BlockSelectionPlugin,
            EmojiPlugin.configure({
                options: { data: emojiMartaData as EmojiMartData },
            }),
            ExitBreakPlugin.configure({
                options: {
                    rules: [
                        {
                            hotkey: "mod+enter",
                        },
                        {
                            before: true,
                            hotkey: "mod+shift+enter",
                        },
                        {
                            hotkey: "enter",
                            level: 1,
                            query: {
                                allow: ["h1", "h2", "h3"],
                                end: true,
                                start: true,
                            },
                            relative: true,
                        },
                    ],
                },
            }),
            CommentsPlugin,
            BlockMenuPlugin,
            DndPlugin.configure({
                options: { enableScroller: true },
            }),
            NodeIdPlugin,
            ResetNodePlugin.configure({
                options: {
                    rules: [
                        // Usage: https://platejs.org/docs/reset-node
                    ],
                },
            }),
            DeletePlugin,
            SoftBreakPlugin.configure({
                options: {
                    rules: [
                        { hotkey: "shift+enter" },
                        {
                            hotkey: "enter",
                            query: {
                                allow: ["code_block", "blockquote", "td", "th"],
                            },
                        },
                    ],
                },
            }),
            TabbablePlugin,
            TrailingBlockPlugin.configure({
                options: { type: "p" },
            }),
            CursorOverlayPlugin,
            // CursorOverlayPlugin.configure({
            //     render: { afterEditable: () => <CursorOverlay /> },
            // }),
            FixedToolbarPlugin,
            FloatingToolbarPlugin,
            SlashPlugin.extend({
                options: {
                    triggerQuery(editor) {
                        return !editor.api.some({
                            match: { type: editor.getType(CodeBlockPlugin) },
                        });
                    },
                },
            }),
            DocxPlugin,
            CsvPlugin,
            MarkdownPlugin.configure({ options: { indentList: true } }),
            JuicePlugin,
        ],
        override: {
            components: withPlaceholders({
                // [AIPlugin.key]: AILeaf,
                [BlockquotePlugin.key]: BlockquoteElement,
                [CodeBlockPlugin.key]: CodeBlockElement,
                [CodeLinePlugin.key]: CodeLineElement,
                [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
                [ExcalidrawPlugin.key]: ExcalidrawElement,
                [HorizontalRulePlugin.key]: HrElement,
                [ImagePlugin.key]: ImageElement,
                [LinkPlugin.key]: LinkElement,
                [TogglePlugin.key]: ToggleElement,
                [ColumnPlugin.key]: ColumnGroupElement,
                [ColumnItemPlugin.key]: ColumnElement,
                [SlashInputPlugin.key]: SlashInputElement,
                [EmojiPlugin.key]: EmojiInputElement,
                [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
                [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
                [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
                [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
                [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
                [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
                [MediaEmbedPlugin.key]: MediaEmbedElement,
                [MentionPlugin.key]: MentionElement,
                [MentionInputPlugin.key]: MentionInputElement,
                [ParagraphPlugin.key]: ParagraphElement,
                [TablePlugin.key]: TableElement,
                [TableRowPlugin.key]: TableRowElement,
                [TableCellPlugin.key]: TableCellElement,
                [TableCellHeaderPlugin.key]: TableCellHeaderElement,
                [TodoListPlugin.key]: TodoListElement,
                [DatePlugin.key]: DateElement,
                [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
                [CodePlugin.key]: CodeLeaf,
                [CommentsPlugin.key]: CommentLeaf,
                [HighlightPlugin.key]: HighlightLeaf,
                [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
                [KbdPlugin.key]: KbdLeaf,
                [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
                [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
                [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
                [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
            }),
        },
        value: [
            {
                children: [{ text: "Basic Editor" }],
                type: "h1",
            },
            {
                children: [{ text: "Heading 2" }],
                type: "h2",
            },
            {
                children: [{ text: "Heading 3" }],
                type: "h3",
            },
            {
                children: [{ text: "This is a blockquote element" }],
                type: "blockquote",
            },
            {
                children: [
                    { text: "Basic marks: " },
                    { bold: true, text: "bold" },
                    { text: ", " },
                    { italic: true, text: "italic" },
                    { text: ", " },
                    { text: "underline", underline: true },
                    { text: ", " },
                    { strikethrough: true, text: "strikethrough" },
                    { text: "." },
                ],
                type: ParagraphPlugin.key,
            },
        ],
    });
};
