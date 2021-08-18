import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import style from './edit-about-me-dialog.module.scss';
import { DialogWrapper } from 'components/shared/dialog';
import { postAboutMe } from 'adapters';
import { useDispatch, useSelector } from 'react-redux';
import { GetUrlBuilderData, SetUrlBuilderData } from 'store/url-builder';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

const options = {
 options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign', 'emoji'],
};

export interface EditAboutMeDialogProps {
 isOpen: boolean;
 onClose(): void;
}

export const EditAboutMeDialog = ({ isOpen, onClose }: EditAboutMeDialogProps) => {
 const [loading, setLoading] = useState(false);
 const builderData = useSelector(GetUrlBuilderData);
 const editorInitValue = builderData.aboutMe ? EditorState.createWithContent(stateFromHTML(builderData.aboutMe.text)) : EditorState.createEmpty();
 const [editorState, setEditorState] = useState(() => editorInitValue);
 const dispatch = useDispatch();

 const submit = () => {
  setLoading(true);
  const aboutMeHtmlInput = stateToHTML(editorState.getCurrentContent());
  postAboutMe(aboutMeHtmlInput)
   .then(({ data }) => {
    if (!data.success) return;
    dispatch(SetUrlBuilderData(data.data));
    onClose();
   })
   .finally(() => setLoading(false));
 };

 return (
  <DialogWrapper open={isOpen} onClose={onClose} loading={loading} onSubmit={submit} title='About Me'>
   <Editor
    editorClassName={style.editor}
    wrapperClassName={style.editorContainer}
    toolbarClassName={style.toolbar}
    toolbar={options}
    editorState={editorState}
    onEditorStateChange={setEditorState}
   />
  </DialogWrapper>
 );
};
