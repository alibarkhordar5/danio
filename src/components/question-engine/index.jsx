// general imports
import React, { useMemo, Suspense } from 'react';
import { Grammar, Parser } from 'nearley';

// custom components
import Lang from './ne-config/lang.c';
import { MathJaxWrapper } from './mathjax-config/MathJaxWrapper';
import { useSnackbar } from 'src/components/snackbar';

const isDataMaro = (macro) => {
    if (typeof macro !== 'string' && macro.type === 'data') {
        return true;
    }
};

const MacroGetter = (tagName, version) => {
    const MacroGetterMap = new Map([
        ['measurement', React.lazy(() => import('src/components/question-components/measurement/v1'))],
        ['input', React.lazy(() => import('src/components/question-components/input/v1'))],
        ['math', React.lazy(() => import('src/components/question-components/math/v1'))],
        ['select', React.lazy(() => import('src/components/question-components/select/v1'))],
        ['option', React.lazy(() => import('src/components/question-components/option/v1'))],
        ['abacus', React.lazy(() => import('src/components/question-components/abacus/v1'))],
        ['text', React.lazy(() => import('src/components/question-components/text/v1'))],
        ['number_line', React.lazy(() => import('src/components/question-components/numberLine/v2'))],
        ['numerical_cube', React.lazy(() => import('src/components/question-components/numericalCube/v1'))],
        ['direction_box', React.lazy(() => import('src/components/question-components/directionBox/v1'))],
        ['numerical_table', React.lazy(() => import('src/components/question-components/placeValueTable/v1'))],
        ['place_value_table', React.lazy(() => import('src/components/question-components/placeValueTable/v1'))],
        ['underline', React.lazy(() => import('src/components/question-components/underLine/v1'))],
        ['money', React.lazy(() => import('src/components/question-components/money/v1'))],
        ['table_machine', React.lazy(() => import('src/components/question-components/tableMachine/v1'))],
        ['scroll_box', React.lazy(() => import('src/components/question-components/scrollBox/v1'))],
        ['big_arrow', React.lazy(() => import('src/components/question-components/bigArrow/v1'))],
        ['ruler', React.lazy(() => import('src/components/question-components/ruler/v1'))],
        ['img', React.lazy(() => import('src/components/question-components/image/v1'))],
        ['fruit', React.lazy(() => import('src/components/question-components/fruit/v1'))],
        ['clock', React.lazy(() => import('src/components/question-components/clock/v1'))],
        ['analog_clock', React.lazy(() => import('src/components/question-components/analogClock/v1'))],
        ['digital_clock', React.lazy(() => import('src/components/question-components/digitalClock/v1'))],
        ['simple_add_sub_mult', React.lazy(() => import('src/components/question-components/simple-add-sub-mult/v1'))],
        ['simple_division', React.lazy(() => import('src/components/question-components/simple-division/v1'))],
        ['multiply_table', React.lazy(() => import('src/components/question-components/multiply-table/v1'))],
        ['floor', React.lazy(() => import('src/components/question-components/floor/v1'))],
        ['col_add_sub', React.lazy(() => import('src/components/question-components/columnAdditionAndSubtraction/v1'))],
        [
            'number_line_vertical_arrow',
            React.lazy(() => import('src/components/question-components/numberLineVerticalArrow/v' + version)),
        ],
        ['scale', React.lazy(() => import('src/components/question-components/scale/v1'))],
        ['population_table', React.lazy(() => import('src/components/question-components/populationTable/v1'))],
        ['scaled_frac_shape', React.lazy(() => import('src/components/question-components/scaledFracShape/v1'))],
        ['fraction_shape', React.lazy(() => import('src/components/question-components/fraction-shape/v1'))],
        ['fraction_click', React.lazy(() => import(`src/components/question-components/fraction-click/v${version}`))],
        ['hammeric_division', React.lazy(() => import('src/components/question-components/hammericDivision/v1'))],
        ['multiply', React.lazy(() => import('src/components/question-components/multiply/v1'))],
        ['hundred_square', React.lazy(() => import('src/components/question-components/hundredSquare/v1'))],
        ['triangle', React.lazy(() => import('src/components/question-components/triangle/v1'))],
        ['triangle', React.lazy(() => import('src/components/question-components/triangle/v1'))],
        ['ratio_table', React.lazy(() => import('src/components/question-components/ratio-table/v2'))],
        ['dec_addsub', React.lazy(() => import('src/components/question-components/decAddSub/v1'))],
        ['decimal_expand', React.lazy(() => import('src/components/question-components/decimalExpand/v1'))],
        ['color_sym', React.lazy(() => import('src/components/question-components/colorSym/v1'))],
        ['new_scale', React.lazy(() => import('src/components/question-components/new-scale/v1'))],
        ['angles', React.lazy(() => import('src/components/question-components/angles/v1'))],
        ['sym_lines', React.lazy(() => import('src/components/question-components/symLines/v1'))],
        ['color_point_sym', React.lazy(() => import('src/components/question-components/color-point-sym/v1'))],
        ['disable_input', React.lazy(() => import('src/components/question-components/disable-input/v1'))],
        ['adv_triangle', React.lazy(() => import('src/components/question-components/advanced-triangle/v1'))],
        ['coordinate', React.lazy(() => import('src/components/question-components/coordinate/v1'))],
        ['circle_sym', React.lazy(() => import('src/components/question-components/circleSym/v1'))],
        ['rotation', React.lazy(() => import('src/components/question-components/rotation/v1'))],
        ['between_arrows', React.lazy(() => import('src/components/question-components/betweenArrows/v1'))],
        ['count_cube', React.lazy(() => import('src/components/question-components/countCube/v1'))],
        ['roller_cube', React.lazy(() => import('src/components/question-components/rollerCube/v1'))],
        ['area', React.lazy(() => import('src/components/question-components/area/v1'))],
        ['cube_patterns', React.lazy(() => import('src/components/question-components/cube-patterns/v1'))],
        ['decimal_estimate', React.lazy(() => import('src/components/question-components/decimal-estimate/v1'))],
        ['perimeter_shape', React.lazy(() => import('src/components/question-components/perimeter-shape/v1'))],
        ['volume_cube', React.lazy(() => import('src/components/question-components/volume-cube/v1'))],
        ['new_ruler', React.lazy(() => import('src/components/question-components/new-ruler/v1'))],
        ['text_for_image', React.lazy(() => import('src/components/question-components/text-for-image/v1'))],
        ['ratio_table_new', React.lazy(() => import('src/components/question-components/ratio-table-new/v2'))],
        ['tikbox', React.lazy(() => import('src/components/question-components/tikbox/v1'))],
        ['zruler', React.lazy(() => import('src/components/question-components/zruler/v1'))],
        ['chart', React.lazy(() => import('src/components/question-components/chart/v1'))],
        ['draw_height', React.lazy(() => import('src/components/question-components/draw-height/v1'))],
        ['pie', React.lazy(() => import('src/components/question-components/pie/v1'))],
        ['square', React.lazy(() => import('src/components/question-components/square/v1'))],
        ['kaman_clock', React.lazy(() => import('src/components/question-components/arrow-clock/v1'))],
        ['perpen_shape', React.lazy(() => import('src/components/question-components/perpen-shape/v1'))],
        ['money_bag', React.lazy(() => import('src/components/question-components/money-bag/v1'))],
        ['br', React.lazy(() => import('src/components/question-components/br/v1'))],
        ['coordinate_getter', React.lazy(() => import('src/components/question-components/coordinate-getter/v1'))],
        ['tangram', React.lazy(() => import('src/components/question-components/tangram/v1'))],
        ['ordering', React.lazy(() => import('src/components/question-components/ordering/v2'))],
        ['mixed_number_rect', React.lazy(() => import('src/components/question-components/mixed-number-rect/v1'))],
        [
            'divide_by_fraction',
            React.lazy(() => import(`src/components/question-components/divide-by-fraction/v${version}`)),
        ],
    ]);

    return MacroGetterMap.get(tagName);
};

const QuestionMacroViewer = (props) => {
    const { macros, ...otherProps } = props;
    const { componentIds = { current: [] } } = props;
    return (
        <>
            {macros.map((macro, index) => {
                if (isDataMaro(macro)) {
                    // do nothing!
                    return null;
                } else if (typeof macro === 'string') {
                    return <React.Fragment key={index}>{macro}</React.Fragment>;
                } else {
                    const tagName = macro.tag;
                    const version = parseInt(JSON.stringify(macro.v)) || 1;
                    const Tag = MacroGetter(tagName, version);
                    if (Tag) {
                        const children = [];
                        const data = [];

                        macro.args.forEach((arg, index) => {
                            // if this argument has only one sub-macro
                            if (arg.length === 1) {
                                // if the sub-macro is a 'string', just render it.
                                if (typeof arg[0] === 'string') {
                                    children.push(arg[0]);
                                }
                                // if it is a data-macro push it in the data array
                                else if (isDataMaro(arg[0])) {
                                    data.push(arg[0]);
                                } else {
                                    children.push(<QuestionMacroViewer key={index} macros={arg} {...otherProps} />);
                                }
                            } else {
                                children.push(<QuestionMacroViewer key={index} macros={arg} {...otherProps} />);
                            }
                        });

                        const { attrs, ...otherMacroInfo } = macro;

                        if (attrs && attrs.id && !componentIds.current.includes(attrs.id)) {
                            componentIds.current.push(attrs.id);
                        }

                        const props = {
                            key: index,
                            data,
                            showingAttrs: attrs ? attrs : {},
                            ...otherMacroInfo,
                            ...otherProps,
                        };

                        return (
                            <Suspense fallback="Loading...">
                                {' '}
                                {React.createElement(Tag, props, children.length === 0 ? undefined : children)}
                            </Suspense>
                        );
                    }
                    return <React.Fragment key={index} />;
                }
            })}
        </>
    );
};

const QuestionParser = React.memo((props) => {
    const { grammar } = Lang();

    const { enqueueSnackbar } = useSnackbar();
    const hierarchy = useMemo(() => {
        try {
            const parser = new Parser(Grammar.fromCompiled(grammar));
            parser.feed(props.content);
            const parseResult = parser.results[0];
            if (parseResult) return parseResult;
            throw Error('parse error');
        } catch (parserError) {
            // alert('error for compiling question');
            enqueueSnackbar('parse error', { variant: 'error' });
            console.log('!!!!!!!!!! parse error !!!!!!!!!!\n', parserError.detail || parserError.message);
            return [];
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.content]);

    return <QuestionMacroViewer macros={hierarchy} {...props} />;
});

QuestionParser.displayName = 'QuestionParser';

const QuestionEngine = (props) => {
    return (
        <>
            <MathJaxWrapper>
                <QuestionParser {...props} />
            </MathJaxWrapper>
        </>
    );
};
QuestionEngine.displayName = 'QuestionEngine';

export default QuestionEngine;
